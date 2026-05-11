import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@styles": "/src/styles",
      "@tools": "/src/tools",
      "@components": "/src/components",
    },
  },
});
