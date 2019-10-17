"use strict";

import stylesheet from "../_css/index.css";
import App from "./app.js";


window.addEventListener("load", () => 
{
    let app = new App();
    app.start();
});