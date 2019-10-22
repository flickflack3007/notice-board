"use strict";

import stylesheet from "../_css/app.css";
import Home from "../home-page/home.js";
import Login from "../login-page/login.js";
import CreateNotice from "../createNotice-page/createNotice.js";
import Database from "./database";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */

let partialsCache = {};


class App {
    /**
     * Konstruktor.
     */
    constructor() {

        //TO DO View Changer

        //FireStore Datenbank
        this._db = new Database();
        this._db.start();
        
        //Template Javascript Classen
        this._home = new Home();
        this._home.startHome();

        this._login = new Login();
        this._login.startLogin();

        this._createNotice = new CreateNotice(this);
        this._createNotice.startCreateNotice();
        
    }

    /**
     * Ab hier beginnt die Anwendung zu laufen.
     * (sozuagen main-methode)
     */
    start() {
        console.log("Die Klasse App sagt Hallo!");

        //Wenn keine Fragment ID (#) zum Start der Seite ausgewählt wurde, zeige #home an
        if (!window.location.hash) {
            window.location.hash = "#home";
        }
        //lade die erste Navigation beim Seiten aufruf
        this.navigate();

        //ruft die methode navigate auf wenn ein hashchange event auftritt
        this.addHashListener();
    }

    logHash() {
        window.console.log(location.hash);
    }

    addHashListener() {
        window.addEventListener("hashchange", this.navigate.bind(this));
    }

    navigate() {
        //Suche nach dem zu befüllenden Inhaltselement
        let contentDiv = window.document.getElementById("content");

        //location.hash wird ohne # in variable fragmentID gespeichert
        let fragmentID = window.location.hash.substr(1);

        //Befüllung des Inhaltselement mithilfe einer asynchronen Callback Function getContent
        this.getContent(fragmentID, function (content) {
            contentDiv.innerHTML = content;
        })
    }

    getContent(fragmentID, callback) {
        if (partialsCache[fragmentID]) {
            callback(partialsCache[fragmentID]);
            window.console.log(partialsCache);
        } else {
            this.fetchFile(fragmentID + ".html", function (content) {

                // Store the fetched content in the cache.
                partialsCache[fragmentID] = content;

                // Pass the newly fetched content to the callback.
                callback(content);
            });
        }

    }

    fetchFile(path, callback) {

        //erzeugen eines XMLHttpRequest
        let request = new XMLHttpRequest();

        //Aufrufen des Files
        request.open("GET", path, true);

        /*
        //Aufrufen der Callback mit dem geladenen Inhalt
        request.onload = function () {
            callback(request.responseText);
        }
        */

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(request.responseText);
            }
        }

        //Senden
        request.send(null);

    }


}
export default App;