import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { captureUtmParams } from "@/lib/utm";
import "./index.css";

// Capture campaign attribution before the first render so booking embeds
// pick up utm_* immediately.
captureUtmParams();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
