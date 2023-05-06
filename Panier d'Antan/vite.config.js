import fs from "fs/promises";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(() => ({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
          "react-router-dom": ["react-router-dom"],
          "@mui/material": ["@mui/material"],
          "@mui/icons-material": ["@mui/icons-material"],
          "react-leaflet": ["react-leaflet"],
          leaflet: ["leaflet"],
          "react-geolocated": ["react-geolocated"],
        },
      },
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
}));
