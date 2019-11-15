"use strict"

import stylesheet from "../_css/login.css";
import App from "../_js/app";

let _app = "";
let _database = "";

class Login {

    constructor(app) {

        this._app = app;
        _app = this._app;
        _database = app._database;

        App.changeTitle("Notice Board - Login");
    }

    startLogin()
    {
        window.console.log("Login");
    }
}
export default Login;