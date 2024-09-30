import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./my_reset.css";
import GlobalStyle from "./common/GlobalStyle";

createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </>
);
