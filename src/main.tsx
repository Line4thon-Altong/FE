import { StrictMode } from "react";
import { GlobalStyle } from "./styles/global-style.ts";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./utils/axiosConfig"; // axios interceptor 초기화

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
