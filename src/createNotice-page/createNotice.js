"use strict"

import stylesheet from "../_css/createNotice.css";
import { database } from "firebase";
import { ENGINE_METHOD_DIGESTS } from "constants";
import App from "../_js/app";

let _app = "";
let _database = "";

class CreateNotice {
    constructor(app) {

        this._app = app;
        _app = this._app;
        _database = app._database;

        App.changeTitle("Notice Board - Neue Notiz erstellen");

        this.addSubmitButtonListener();
    }

    startCreateNotice()
    {
        window.console.log("Klasse CreateNotice gestartet");
    }

    addSubmitButtonListener() {
        let button = window.document.getElementById("erstellenButton");
        button.addEventListener("click", () => {
            this.saveNotice();
        });
    }

    saveNotice()
    {
        let title = window.document.getElementById("form_title").value;
        window.console.log(title);

        let inhalt = window.document.getElementById("form_inhalt").value;
        window.console.log(inhalt);

        _database.addNotice(title, inhalt);
        
    }
}
export default CreateNotice;