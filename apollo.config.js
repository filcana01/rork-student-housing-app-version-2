import { loadEnv } from "vite";

const appConfig = loadEnv("development", process.cwd());

export default {
  client: {
    service: {
      name: "housing-ms-dev",
      url: appConfig.VITE_API_URL,
    },
    includes: ["src/**/api/**/*.graphql"],
  },
};
