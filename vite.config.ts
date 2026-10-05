import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(
        new URL("./src", import.meta.url)
      ),
    },
  },
});