#!/usr/bin/env node
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { execSync } from "child_process";
import semver from "semver";

// 1. Get the bump argument
const [arg] = process.argv.slice(2);
if (!arg) {
  console.error(
    "Usage: yarn release -- [major|minor|patch|premajor|preminor|prepatch|prerelease|alpha|beta|rc|x.y.z]"
  );
  process.exit(1);
}

// 2. Read current release.js
const releasePath = resolve("src/config/release.js");
let content = await readFile(releasePath, "utf-8");

// 3. Extract current version
const match = content.match(
  /VERSION\s*=\s*['"](\d+\.\d+\.\d+(?:-[^'"]+)?)['"]/
);
if (!match) {
  console.error("Could not find a valid VERSION in release.js");
  process.exit(1);
}
const currentVersion = match[1];

// 4. Compute new version
let newVersion;
if (semver.valid(arg)) {
  newVersion = arg;
} else if (
  [
    "major",
    "minor",
    "patch",
    "premajor",
    "preminor",
    "prepatch",
    "prerelease",
  ].includes(arg)
) {
  newVersion = semver.inc(currentVersion, arg);
} else if (["alpha", "beta", "rc"].includes(arg)) {
  // shorthand: bump prerelease with identifier
  newVersion = semver.inc(currentVersion, "prerelease", arg);
} else {
  console.error(
    "Invalid argument. Must be semver or one of major/minor/patch/premajor/preminor/prepatch/prerelease/alpha/beta/rc"
  );
  process.exit(1);
}

if (!newVersion) {
  console.error("Failed to calculate new version.");
  process.exit(1);
}

// 5. Today's date
const today = new Date().toISOString().slice(0, 10);

// 6. Replace VERSION & DATE
content = content
  .replace(
    /(VERSION\s*=\s*['"])\d+\.\d+\.\d+(?:-[^'"]+)?(['"])/,
    `$1${newVersion}$2`
  )
  .replace(/(DATE\s*=\s*['"])\d{4}-\d{2}-\d{2}(['"])/, `$1${today}$2`);
await writeFile(releasePath, content, "utf-8");
console.log(`✅ Bumped to ${newVersion} (${today})`);

// 7. Git add / commit / tag
execSync(`git add "${releasePath}"`, { stdio: "inherit" });
execSync(`git commit -m "chore(release): ${newVersion}"`, { stdio: "inherit" });
execSync(`git tag "${newVersion}"`, { stdio: "inherit" });
console.log(`✅ Committed & tagged ${newVersion}`);

// 8. Push to remote
execSync(`git push`, { stdio: "inherit" });
execSync(`git push origin "${newVersion}"`, { stdio: "inherit" });
console.log(`✅ Pushed commit and tag ${newVersion}`);
