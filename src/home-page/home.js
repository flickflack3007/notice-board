"use strict"

import stylesheet from "../_css/home.css";
import App from "../_js/app";

let _app = "";
let _database = "";

class Home {
    constructor(app) {

        this._app = app;
        _app = this._app;
        _database = app._database;

        App.changeTitle("Notice Board - Notizübersicht");
    }

    startHome() {
        window.console.log("Klasse Home gestartet");
    }

    showNotice()
    {

    }
}
export default Home;