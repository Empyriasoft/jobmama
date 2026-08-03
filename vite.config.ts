import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // Pre-bundle Radix primitives that are only imported by lazily-reached
    // components, so Vite doesn't re-optimize mid-session and briefly load a
    // second React copy (causes an "Invalid hook call" flash on first paint).
    include: ["@radix-ui/react-accordion"],
  },
}));
