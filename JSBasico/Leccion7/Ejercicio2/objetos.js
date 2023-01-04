const datosPersonales = {
    nombre: "Santos",
    apellidos: "Alarcón Asensio",
    edad: 35,
    altura: 1.81,
    eresDesarrollador: true,
}

const edad = datosPersonales.edad;

const amigo1 = {
    nombre: "Silvia",
    apellidos: "Montalbán Romero",
    edad: 28,
    altura: 1.60,
    eresDesarollador: false,
}

const amigo2 = {
    nombre: "Cristian",
    apellidos: "García Minguillán",
    edad: 30,
    altura: 1.77,
    eresDesarollador: false,
}

const lista = new Array(datosPersonales, amigo1, amigo2)
const listaOrdenada = lista.sort((a,b) => a.edad > b.edad ? -1 : 0)
console.log(listaOrdenada)
