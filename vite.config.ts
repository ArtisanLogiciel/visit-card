import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, UserConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  globals: true,
  test: {
    environment: "jsdom",
    setupFiles: ["./setupTest.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
} as UserConfig);
