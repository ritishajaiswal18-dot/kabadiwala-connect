import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import HindiTranslator from "./HindiTranslator.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
      <HindiTranslator />
    </>
  </React.StrictMode>
);
