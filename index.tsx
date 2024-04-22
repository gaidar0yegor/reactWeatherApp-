import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
  </React.StrictMode>
);
