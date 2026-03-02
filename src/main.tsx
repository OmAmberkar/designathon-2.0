import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import LenisProvider from "./lib/Lenis";

// force page to start at top on every load/reload
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </StrictMode>,
);
