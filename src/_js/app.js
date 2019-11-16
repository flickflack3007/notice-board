"use strict";

import stylesheet from "../_css/app.css";
import Home from "../home-page/home.js";
import Delete from "../delete-page/delete.js";
import CreateNotice from "../createNotice-page/createNotice.js";
import Database from "./database";
import {
    app, database
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

        //FireStore Datenbank
        this._database = new Database();
        this._database.start();

        //Template Javascript Classen
        this._createNotice = null;
        this._home = null;
        this._delete = null;
    }

    static changeTitle(t)
    {
        window.document.title = t;
    }

    /**
     * Ab hier beginnt die Anwendung zu laufen.
     * (sozuagen main-methode)
     */
    start() {
        window.console.log("Die Klasse App sagt Hallo!");

        //Wenn keine Fragment ID zum Start der Seite ausgewählt wurde, zeige #home an
        if (window.location.pathname == "/") {
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

        this.updateSidebar();

        //location.hash wird ohne # in variable fragmentID gespeichert
        let fragmentID = window.location.pathname;
        if (this.testRoutes(fragmentID) === true) {
            this.getContent(fragmentID);
        } else {
            window.console.log("Ungültige Pfadeingabe");
        }
    }

    changeEventListener(fID) {
        switch (fID) {
            case "/createNotice":
                this._createNotice = new CreateNotice(this);
                this._createNotice.startCreateNotice();
                break;
            case "/home":
                this._home = new Home(this);
                this._home.startHome();
                break;
            case "/delete":
                this._delete = new Delete(this);
                this._delete.startDelete();
                break;
        }
    }

    testRoutes(fID) {
        switch (fID) {
            case "/home":
                return true;
            case "/createNotice":
                return true;
            case "/delete":
                return true;
        }
        return false;
    }


    //Content Befüllung
    getContent(fragmentID) {

        if (partialsCache[fragmentID]) {
            window.console.log(partialsCache);
            return partialsCache[fragmentID];
        } else {
            let that = this;

            this.fetchFile(fragmentID + ".html").then(function (response) {
                //Suche nach dem zu befüllenden Inhaltselement
                let contentDiv = window.document.getElementById("content");
                contentDiv.innerHTML = response;
                partialsCache[fragmentID] = response;

                that.changeEventListener(fragmentID);

            }, function (Error) {
                window.console.log(Error);
            });
        }

    }

    fetchFile(path) {
        return new Promise(function (resolve, reject) {

            //erzeugen eines XMLHttpRequest
            let request = new XMLHttpRequest();
            //Aufrufen des Files
            request.open("GET", path, true);

            request.onload = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(request.responseText);
                } else {
                    reject(Error("Template wurde nicht geladen; error code:" + request.statusText));
                }
            };

            request.onerror = function () {
                reject(Error("Netzwerkfehler aufgetretten"))
            };

            //Senden
            request.send(null);

        });
    }

    updateSidebar()
    {
        window.console.log("Update Sidebar");
        let oldNoticeList = window.document.getElementById("noticeList");
        oldNoticeList.remove();

        let sidebar = window.document.getElementById("sidebar");
        let newNoticeList = window.document.createElement('ul');
        newNoticeList.id = "noticeList";
        sidebar.appendChild(newNoticeList);

        let that = this;
        this._database.getAllMinimierteNotice().then(function(querySnapshot)
        {
            querySnapshot.forEach(function(doc)
            {
                let li = that.createSidebarElement(doc);
                newNoticeList.appendChild(li);
            });
        })  
    }

    createSidebarElement(doc)
    {
        let li = window.document.createElement('li');
        let but = window.document.createElement('button');
        let that = this;
        but.addEventListener("click", function()
        {
            window.console.log(but.textContent);
            let t = but.textContent;
            that._database.getNoticeByTitel(t);
            but.remove();
        });

        but.textContent = doc.data().titel;
        li.appendChild(but);
        return li;
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