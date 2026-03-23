// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // ✅ SWC plugin
// import path from "path";

export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //   },
  // },
  // vite.config.ts

  server: {
    port: 3000,
    proxy: {
      // Every request starting with /api will be forwarded to the backend.
      // The browser sees it as same-origin (localhost:3000/api/...)
      // so SameSite=Strict cookies ARE sent.
      "/api": {
        target: "http://192.168.1.60:83",
        changeOrigin: true,
        secure: false,
        // NO rewrite — your backend routes already start with /api
        // e.g. /api/v1/Auth/login stays as /api/v1/Auth/login on the backend
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-redux", "@reduxjs/toolkit"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
