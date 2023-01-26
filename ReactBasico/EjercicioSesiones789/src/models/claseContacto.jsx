export default class Contacto {
    nombre = "";
    apellidos = "";
    telefono = "";
    email = "";
    conectado = false;

    constructor(nombre, apellidos, telefono, email, conectado) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.email = email;
        this.conectado = conectado;
    }
}