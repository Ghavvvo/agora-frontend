import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ReactQueryProvider } from "./app/providers";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ReactQueryProvider>
    <App />
  </ReactQueryProvider>
);
