import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const allowedNgrokHost =
  "2c21-2001-861-205e-cfc0-3098-6b07-3ffe-6975.ngrok-free.app";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [allowedNgrokHost],
  },
});
