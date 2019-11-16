"use strict"

import stylesheet from "../_css/createNotice.css";
import {
    database,
    app
} from "firebase";
import {
    ENGINE_METHOD_DIGESTS
} from "constants";
import App from "../_js/app";

let _app = "";
let _database = "";

class CreateNotice {
    constructor(app) {

        this._app = app;
        _app = this._app;
        _database = app._database;

        App.changeTitle("Notice Board - Neue Notiz erstellen");

        this.addSaveButtonListener();
    }

    startCreateNotice() {
        window.console.log("Klasse CreateNotice");
    }

    addSaveButtonListener() {
        let createButton = window.document.getElementById("saveButton");
        createButton.addEventListener("click", () => {
            this.saveNotice();
            window.document.getElementById("form_title").value = "";
            window.document.getElementById("form_inhalt").value = "";
            _app.updateSidebar();
        });
    }

    saveNotice() {
        let title = window.document.getElementById("form_title").value;
        window.console.log(title);

        let inhalt = window.document.getElementById("form_inhalt").value;
        window.console.log(inhalt);

        let alertMessage = _database.addNotice(title, inhalt);
        window.alert(alertMessage);
    }

    changePathToHome() {
        window.location.pathname = "/home";
    }
}
export default CreateNotice;