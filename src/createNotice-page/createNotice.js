"use strict"

import stylesheet from "../_css/createNotice.css";

let _app = "";
let _database = "";

class CreateNotice {
    constructor(app) {
        this._app = app;
        _app = this._app;
        _database = app._database;
    }

    addSubmitButtonListener()
    {
        
        let form = window.document.getElementById("formID");
        form.addEventListener("submit", function(e)
        {
            e.preventDefault();
            window.console.log("Help");
            return false;
        }
        , false);
        
    }

    startCreateNotice()
    {
        window.console.log("CreateNotice");
    }

    saveNotice(title, inhalt, erstelldatum)
    {
        _database.addNotice(title, inhalt, erstelldatum);
    }
}
export default CreateNotice;