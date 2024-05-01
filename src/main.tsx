import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="dark h-screen bg-background text-foreground">
      <App />
    </main>
  </React.StrictMode>
);
