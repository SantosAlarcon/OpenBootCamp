import {PRIORIDAD} from './enumPrioridad'

export default class Tarea {
    nombre = "";
    descripcion = "";
    prioridad = PRIORIDAD.NORMAL;
    completada = false;

    constructor(nombre, descripcion, prioridad, completada) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.completada = completada;
    }
}