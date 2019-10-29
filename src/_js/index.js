"use strict";

import stylesheet from "../_css/index.css";
import App from "./app.js";


window.addEventListener("load", () => 
{
    let app = new App();
    app.start();
});


<script type="text/javascript">
      var source;
      function dragstart_handler(ev) {
        source=ev.target;
        ev.dataTransfer.setData("text/plain", ev.target.innerHTML);
        ev.dataTransfer.effectAllowed = "move";
      }
      function dragover_handler(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move"
      }
      function drop_handler(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        source.innerHTML = ev.target.innerHTML;
        ev.target.innerHTML = ev.dataTransfer.getData("text/plain");
      }
      elementList = document.querySelectorAll("li")
      elementList.forEach(function(li){
        li.addEventListener('dragstart', dragstart_handler, false);
        li.addEventListener('dragover', dragover_handler, false);
        li.addEventListener('drop', drop_handler, false);
      }
                         );
    </script>