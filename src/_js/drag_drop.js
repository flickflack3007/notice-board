drag = (ev) => {
    ev.dataTransver.setData("text", ev.target.id);
}

drop = (ev) => {
    ev.preventDefault();
    let data = ev.dataTransver.getData("text");
    document.getElementById(data);
    ev.target.appendChild(document.getElementById(data));
}

allowDrop = (ev) => {
    ev.preventDefault();
}