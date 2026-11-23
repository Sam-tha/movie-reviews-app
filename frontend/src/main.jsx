// main.jsx - the entry point: renders <App /> into the #root div.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./global.css"; // the ONE stylesheet, imported once here (Chapter 9)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter wraps the whole app once so every component can use routing (Chapter 25) */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
