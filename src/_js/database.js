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
        window.console.log("Database");
    }

    addNotice(t, i, e)
    {
        _db.collection("users").add({
            titel: t,
            inhalt: i,
            erstelldatum: e
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    getNotice()
    {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    }
}
export default  Database;