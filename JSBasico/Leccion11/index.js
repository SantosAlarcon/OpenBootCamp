class Estudiante {
    #nombre;
    #asignaturas = ["HTML", "CSS", "JavaScript"];

    constructor(nombre) {
        this.#nombre = nombre;
    }

    obtenDatos() {
        return `Nombre: ${this.#nombre} - Asignaturas: ${this.#asignaturas}`;
    }
}

const e1 = new Estudiante("Manolete");
console.log(e1.obtenDatos());