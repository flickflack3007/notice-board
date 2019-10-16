"use strict";

import stylesheet from "../_css/app.css";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
class App {
    /**
     * Konstruktor.
     */
    constructor() {}

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
        this.logHash();

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
        console.log(this);
        //Suche nach dem zu befüllenden Inhaltselement
        let contentDiv = window.document.getElementById("content");

        //location.hash wird ohne # in variable fragmentID gespeichert
        let fragmentID = window.location.hash.substr(1);
        console.log(this);

        //Befüllung des Inhaltselement mithilfe einer asynchronen Callback Function getContent
        this.getContent(fragmentID, function (content) {
            contentDiv.innerHTML = content;
        })
    }

    getContent(fragmentID, callback) {
        /*
        //erzeugen eines XMLHttpRequest
        let request = new XMLHttpRequest();

        //Aufrufen der Callback mit dem geladenen Inhalt
        request.onload = function(){
            callback(request.responseText);
        }

        let url = fragmentID + ".html";
        request.open("GET", url);
        request.send(null);
        */

        let routes = {
            home: "Das ist die Hauptseite, die die Notizen anzeigt",
            login: "Auf dieser Seite passiert der Login",
            createNotice: "Seite zum Erstellen einer Notiz"
        };
        callback(routes[fragmentID]);
        
    }


}
export default App;