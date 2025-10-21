import js from "@eslint/js";
import globals from "globals";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

export default [
  // global ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "coverage/**",
      "dist/**",
      ".husky/**",
      ".vscode/**",
      ".yarn/**",
      "public/**",
      "src/assets/**",
      "src/locales/**",
      "src/lib/mui-treasury/layout-core-v6/**",
    ],
  },
  // main configuration for JavaScript/JSX files
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        process: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
      import: eslintPluginImport,
      "jsx-a11y": eslintPluginJsxA11y,
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs["jsx-runtime"].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginImport.flatConfigs.recommended.rules,
      "import/no-named-as-default": "off",
      "import/namespace": "off",
      "import/default": "off",
      "react/no-array-index-key": "error",
      "no-param-reassign": "error",
      "no-console": "error",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/prefer-default-export": "error",
      "import/no-cycle": "off",

      // CUSTOM RULES

      // "no-restricted-imports": [
      //   "error",
      //   {
      //     "patterns": ["@/features/*/*"]
      //   }
      // ],
      "import/extensions": [
        "error",
        {
          js: "never",
          jsx: "never",
          json: "ignorePackages",
        },
      ],
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "import/no-named-as-default-member": "off",
      // allow props spreading (using it with RHF and also in other circumstances)
      "react/jsx-props-no-spreading": "off",
      // with new JSX Transform, available from React 17, JSX scope doesn't require React import anymore
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      // In React 19 propTypes and defaultProps have been removed (look at https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-deprecated-react-apis)
      // Upgrade: defaultProps are replaced by ES6 default parameters, props are replaced by TypeScript interface
      // Since we aren't on TypeScript yet, the solution is to switch off the react/require-default-props check for now.
      // Once migrated to TypeScript, it will be possible to run the codemod `npx codemod@latest react/prop-types-typescript` to automatically migrate prop types to interfaces
      "react/require-default-props": "off",
      // Since MUI Treasury Layout v6 is in TypeScript and I had to convert it to JavaScript (and therefore props are not defined), the solution is to switch off the react/require-default-props check for now.
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx"],
        },
      },
    },
  },
  eslintConfigPrettier,
];
