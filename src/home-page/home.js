"use strict"

import stylesheet from "../_css/home.css";
import App from "../_js/app";
import { database, app } from "firebase";

let _app = "";
let _database = "";

class Home {
    constructor(app) {

        this._app = app;
        _app = this._app;
        _database = app._database;

        App.changeTitle("Notice Board - Notizübersicht");
    }

    startHome() {
        window.console.log("Klasse Home");
        this.updateNoticeDisplay();
    }

    updateNoticeDisplay()
    {
        window.console.log("Update Notice Display");
        let oldDisplay = window.document.getElementById("noticeDisplay");
        oldDisplay.remove();

        let content = window.document.getElementById("content");
        let newDisplay = window.document.createElement('ul');
        newDisplay.id = "noticeDisplay";
        content.appendChild(newDisplay);

        let that = this;
        _database.getAllNormalNotice().then(function(querySnapshot)
        {
            querySnapshot.forEach(function(doc)
            {
                let li = that.createNoticeDisplayElement(doc);
                newDisplay.appendChild(li);
                
            });
        })
    }

    createNoticeDisplayElement(doc)
    {
        let li = window.document.createElement('li');
        li.classList.add("notiz");

        let titel = window.document.createElement('h3');
        titel.classList.add("ueberschrift");
        titel.textContent = doc.data().titel;

        let inhalt = window.document.createElement('p');
        inhalt.classList.add("text");
        inhalt.textContent = doc.data().inhalt;

        let minBut = window.document.createElement('button');
        minBut.textContent = "Minimieren";
        minBut.addEventListener("click", function()
        {
            let t = titel.textContent;
            _database.getNoticeByTitel(t, true);  
            li.remove();
        });

        li.appendChild(titel);
        li.appendChild(inhalt);
        li.appendChild(minBut);
        return li;
    }
}
export default Home;