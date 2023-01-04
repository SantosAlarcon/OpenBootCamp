class productor {
    #nombre;
    #apellido;
    #genero;

    constructor(nombre, apellido, genero) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#genero = genero;
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    getApellido() {
        return  this.#apellido;
    }

    setApellido(apellido) {
        this.#apellido = apellido;
    }

    getGenero() {
        return  this.#genero;
    }

    setGenero(genero) {
        this.#genero = genero;
    }

    datos() {
        return `Nombre: ${this.#nombre}\nApellido: ${this.#apellido}\nGénero: ${this.#genero}`;
    }
}

export default productor;