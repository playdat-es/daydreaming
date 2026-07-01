import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };

function htmlBranding(): Plugin {
  return {
    name: "html-branding",
    transformIndexHtml(html) {
      return html
        .replace(/%APP_NAME%/g, pkg.name)
        .replace(/%APP_PRODUCT_NAME%/g, pkg.productName);
    },
  };
}

export default defineConfig({
  plugins: [react(), htmlBranding()],
  root: "src/client",
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: "../../dist/client",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/api/": "http://127.0.0.1:3001",
    },
  },
});
