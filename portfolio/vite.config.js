import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works from any sub-path (e.g. /tejasbargat16-ux/portfolio/)
export default defineConfig({
  base: "./",
  plugins: [react()],
});
