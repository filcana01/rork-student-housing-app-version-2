import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import graphqlLoader from "vite-plugin-graphql-loader";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createHtmlPlugin } from "vite-plugin-html";
import Utilities from "@usi-inside/utilities";
import { VERSION, DATE } from "./src/config/release";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const appConfig = loadEnv(mode, fileURLToPath(new URL(".", import.meta.url)));

  // derived env variables
  const API_BASE_URL = Utilities.getBaseUrl(appConfig.VITE_API_URL);
  const API_PATH = Utilities.getPath(appConfig.VITE_API_URL);

  return defineConfig({
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      react(),
      graphqlLoader(),
      viteStaticCopy({
        targets: [
          {
            src: "web.config",
            dest: "./",
            transform: (contents) =>
              contents
                .toString()
                .replace("__APP_BASENAME__", appConfig.VITE_APP_BASENAME),
          },
        ],
      }),
      createHtmlPlugin({
        minify: false,
        inject: {
          data: {
            base: `${appConfig.VITE_APP_BASENAME}/`,
            title: `${appConfig.VITE_APP_NAME} @ USI Inside`,
            version: VERSION,
            release_date: DATE,
          },
        },
      }),
    ],
    base: "./",
    server: {
      // https: true,
      open: appConfig.VITE_APP_BASENAME,
      proxy: {
        [API_PATH]: {
          target: API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      // sourcemap: true,
      // manifest: true,
      outDir: `./dist/${mode}`,
    },
  });
};
