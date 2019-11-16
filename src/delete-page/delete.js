"use strict"

import stylesheet from "../_css/delete.css";
import App from "../_js/app";

let _app = "";
let _database = "";

class Delete {

    constructor(app) {

        this._app = app;
        _app = this._app;
        _database = app._database;

        App.changeTitle("Notice Board - Löschen");
    }

    startDelete() {
        window.console.log("Klasse Löschen");
    }
}
export default Delete;