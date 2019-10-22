"use strict"

import stylesheet from "../_css/createNotice.css";

let _app = "";
let _db = "";

class CreateNotice {
    constructor(app) {
        this._app = app;
        _app = this._app;
        _db = app._db;
    }

    startCreateNotice()
    {
        window.console.log("CreateNotice");
    }

    saveNotice(title, inhalt, erstelldatum)
    {
        _db.addNotice(title, inhalt, erstelldatum);
    }
}
export default CreateNotice;