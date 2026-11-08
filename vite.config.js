import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using a relative base ('./') works out of the box for GitHub Pages project sites
  // (e.g. https://username.github.io/repo-name/). If you deploy to a custom domain
  // or the repo root (username.github.io), you can leave this as './' or set it to '/'.
  base: "./",
});
