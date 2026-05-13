import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@tools": path.resolve(__dirname, "./src/tools"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
