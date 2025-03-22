import React from "react";
import ReactDOM from "react-dom/client";

// import { AuthProvider } from "./context/AuthProvider";

import AppCms from "./AppCms";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppCms />
        <App />
    </React.StrictMode>
);
