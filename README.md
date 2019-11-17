Notice Board
===============================


Kurzbeschreibung
----------------

Dies ist eine Single Page Application, da die App nur einmal durch
Aufrufen der HTML-Datei gestartet und dann bis zum Verlassen der
App nicht wieder neugeladen wird.
Die verschiedenen Ansichten werden durch generierte HTML-Templates angezeigt.

Die Anwendung ermöglicht Nutzer*innen die Erstellung von Notizen,
die entweder auf der Hauptansicht angezeigt werden oder als minimierte Version (Titel)
in der Sidebar abgelegt werden.


Verwendete Technologien
-----------------------

Die App nutzt den Node Package Manager (npm) als Paketverwaltung. Auf diese
Weise wird der Application Bundler ParcelJS gesteuert.
Jedoch wird kein übergreifendes Framework wie Angular oder React verwendet.

Folgende Entwicklungswerkzeuge kommen stattdessen zum Einsatz:

 * [Visual Studio Code:](https://code.visualstudio.com) Bester Texteditor für Webentwickler und Programmierer
 * [git:](https://git-scm.com/") Versionsverwaltung zur gemeinsamen Arbeit am Quellcode
 * [npm:](https://nodejs.org/") Paketverwaltung zum automatischen Download abhängiger Bibliotheken
 * [Parcel:](https://parceljs.org/") Web Application Bundler und Entwicklungsserver

Zusätzlich werden folgende Bibliotheken genutzt:

 * [Google Firebase:](https://firebase.google.com/") NoSQL Datenbank zur Serverseitigen Speicherung der Notizen


UI-Skizzen und Screenshots
--------------------------

<table style="max-width: 100%;">
    <tr>
        <td>
            <img src="Desktop_Hauptseite.png" style="display: block; width: 100%;" />
        </td>
        <td>
            <img src="Desktop_CreateNotice.png" style="display: block; width: 100%;" />
        </td>
        <td>
            <img src="Mobile_Hauptseite.png" style="display: block; width: 100%;" />
        </td>
    </tr>
    <tr>
        <td>
            Desktop Hauptseite
        </td>
        <td>
            Darstellung Notiz Erstellen
        </td>
        <td>
            Mobile Ansicht Hauptseite
        </td>
    </tr>
</table>


Zum Starten der Application
---------------------------

* npm install
* npm run build
* npm run start


Zum Minimieren und Maximieren von Notizen
-----------------------------------------

* auf den Minimieren-Button einer Notiz auf der Homepage klicken
* Home über Klick auf "Notice Board" neu laden
* Notiz-Überschrift erscheint jetzt in der Sidebar
* zum Maximieren in der Sidebar auf die Notiz-Überschrift klicken
* Home über Klick auf "Notice Board" neu laden
* Notiz erscheint jetzt wieder komplett auf der Pinnwand