import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID || "G-MB0CZV9M0J").trim();

if (/^G-[A-Z0-9]+$/.test(measurementId || "")) {
  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(analyticsScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
