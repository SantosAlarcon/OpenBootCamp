const secciones = document.querySelectorAll(".seccion");
const parrafos = document.querySelectorAll(".parrafo");
const papelera = document.querySelector(".papelera");

parrafos.forEach(parrafo => {
    parrafo.addEventListener("dragstart", event => {
        event.dataTransfer.setData("id", parrafo.id);
    });
});

secciones.forEach(seccion => {
    seccion.addEventListener("dragover", event => {
        event.preventDefault();
    });

    seccion.addEventListener("drop", event => {
        const id_parrafo = event.dataTransfer.getData("id");
        console.log(id_parrafo);
        const parrafoActual = document.getElementById(id_parrafo);
        seccion.appendChild(parrafoActual);
    });

    papelera.addEventListener("drop", event => {
        const id_parrafo = event.dataTransfer.getData("id");
        console.log(id_parrafo);
        const parrafoActual = document.getElementById(id_parrafo);
        seccion.removeChild(parrafoActual);
    });
});

papelera.addEventListener("dragover", event => {
    event.preventDefault();
});