"use strict"

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
//import "firebase/analytics";

// Add the Firebase products that you want to use
//import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDv-TlhijwuPeXDkB52jVc6BGThFClzyOc",
    authDomain: "notice-board-455f7.firebaseapp.com",
    databaseURL: "https://notice-board-455f7.firebaseio.com",
    projectId: "notice-board-455f7",
    storageBucket: "notice-board-455f7.appspot.com",
    messagingSenderId: "1049774474367",
    appId: "1:1049774474367:web:d816f91cf87b1fe7b26b4a",
    measurementId: "G-ZSD6CBCCXX"
  };

let _db = "";

class Database {
    constructor() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        //Cloud Firestore
        _db = firebase.firestore();
    }

    start()
    {
        window.console.log("Klasse Database");
    }

    addNotice(t, i)
    {
        let alertMessage = "Eintrag erstellt";

        _db.collection("notice").add({
            titel: t,
            inhalt: i,
            minimiert: false
        })
        .then(function(docRef) {
            console.log("Eintrag erstellt mit der ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Fehler beim Speichern in der DB: ", error);
            alertMessage = "Fehler bei der Speicherung";
        });
        return alertMessage;
    }


    getNoticeByTitel(t, boolean)
    {
        _db.collection("notice").where("titel", "==", t).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                _db.collection("notice").doc(doc.id).update({minimiert: boolean});
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    getAllNormalNotice()
    {
        return _db.collection("notice").where("minimiert", "==", false).get();
    }

    getAllMinimierteNotice()
    {
        return _db.collection("notice").where("minimiert", "==", true).get();
    }
}
export default  Database;