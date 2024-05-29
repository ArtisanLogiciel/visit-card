import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.tsx";
import FallbackComponent from "./components/FallbackComponent.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <App />
        {/* Le composant ErrorThrower permet de déclencher une erreur pour tester le error boundary */}
        {/* <ErrorThrower/> */}
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);
