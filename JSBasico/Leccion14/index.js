/*const boton = document.querySelector("button");

boton.addEventListener("click", () => {
    alert("Click en el botón");
});*/

$(() => {
    $("button").click(() => {
        console.log("Hola, estoy utilizando JQuery");
    });
});