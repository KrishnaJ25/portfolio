import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — loads first, tiny
          "vendor-react": ["react", "react-dom"],
          // GSAP animations — loads with main content
          "vendor-gsap": ["gsap"],
          // Three.js core — large but shared
          "vendor-three": ["three"],
          // React Three Fiber ecosystem — lazy loaded with TechStack
          "vendor-r3f": [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
          // Physics engine (Rapier WASM) — heaviest, only needed for TechStack
          "vendor-physics": ["@react-three/rapier"],
        },
      },
    },
  },
});

