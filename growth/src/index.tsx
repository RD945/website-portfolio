import "../tailwind.css";

import "./inline-styles.css";

  (function() {
    document.documentElement.classList.add('js');
    document.documentElement.classList.add('no-transitions');

    // Remove after everything loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                document.documentElement.classList.remove('no-transitions');
            }, 50);
        });
    } else {
        setTimeout(() => {
            document.documentElement.classList.remove('no-transitions');
        }, 50);
    }
})();
  
import "./tailwind-animate.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode data-uid="Xh4zsuQ2Xzc2w-qQ">
    <App data-uid="HFZb7ceizAH0-hNM" />
  </React.StrictMode>,
);
