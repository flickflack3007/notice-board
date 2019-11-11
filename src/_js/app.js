"use strict";

import stylesheet from "../_css/app.css";
import Home from "../home-page/home.js";
import Login from "../login-page/login.js";
import CreateNotice from "../createNotice-page/createNotice.js";
import Database from "./database";
import {
    app
} from "firebase";

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

        //TO Do View Changer
        //To Do window.location.pathname backwarts

        //FireStore Datenbank
        this._database = new Database();
        this._database.start();

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

        //Wenn keine Fragment ID zum Start der Seite ausgewählt wurde, zeige #home an
        if (window.location.pathname  == "/") {
            window.location.pathname = "home";
        }
        //lade die erste Navigation beim Seiten aufruf
        this.navigate();

        //ruft die methode navigate auf wenn ein hashchange event auftritt
        this.addHashListener();
        this.addPathListener();
    }

    //EventListener
    addHashListener() {
        window.addEventListener("hashchange", this.navigate.bind(this));
    }

    // für das Zurück im Browser
    addPathListener() {
        window.addEventListener("popstate", this.navigate.bind(this));
    }


    //Navigation
    navigate() {
        //Suche nach dem zu befüllenden Inhaltselement
        let contentDiv = window.document.getElementById("content");

        //location.hash wird ohne # in variable fragmentID gespeichert
        let fragmentID = window.location.pathname;

       window.console.log(fragmentID); 
        //Befüllung des Inhaltselement mithilfe einer asynchronen Callback Function getContent
        if (this.testRoutes(fragmentID) === true) {
            this.getContent(fragmentID, function (content) {
                
                let nodeTest = window.document.createElement("div");
                nodeTest.innerHTML = content;
                contentDiv.appendChild(nodeTest);
            });
        }
        else 
        {
            contentDiv.innerHTML = "<h1>Dies ist keine gültige URL</h1>";
        }
        this.changeEventListener(fragmentID);
    }

    changeEventListener(fID)
    {
        switch(fID)
        {
            case "/createNotice": 
            window.console.log("changeEventListner");
            this.addSubmitButtonListener();
            break;
        }
    }

    addSubmitButtonListener()
    {
        window.console.log("function called");
        let button = window.document.getElementById("erstellenButton");
        button.addEventListener("click", function()
        {
            window.console.log("1");
        });
    }

    testRoutes(fID) {
        switch (fID) {
            case "/home":
                return true;
            case "/createNotice":
                return true;
            case "/login":
                return true;
        }
        return false;
    }


    //Content Befüllung
    getContent(fragmentID, callback) {

        if (partialsCache[fragmentID]) {
            callback(partialsCache[fragmentID]);
            window.console.log(partialsCache);
        } else {
            this.fetchFile(fragmentID + ".html", function (content) {

                partialsCache[fragmentID] = content;

                callback(content);
            });
        }

    }

    fetchFile(path, callback) {
        //erzeugen eines XMLHttpRequest
        let request = new XMLHttpRequest();
        //Aufrufen des Files
        request.open("GET", path, true);

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(request.responseText);
            }
        }

        //Senden
        request.send(null);
    }


    //Logger
    logPath() {
        window.console.log(window.location.pathname);
    }

    logHash() {
        window.console.log(location.hash);
    }

}
export default App;