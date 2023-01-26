import { NIVELES } from './nivel_enum'

class Tarea {
    nombre = "";
    descripcion = "";
    completada = false;
    nivel = NIVELES.NORMAL;

    constructor(nombre, descripcion, completada, nivel) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.nivel = nivel;
        this.completada = completada;
    }
}

export default Tarea;