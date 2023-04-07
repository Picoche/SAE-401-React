import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from 'fs/promises';


// https://vitejs.dev/config/
export default defineConfig(() => ({
  esbuild: {
    jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
    loader: "jsx",
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
}));