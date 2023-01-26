import {ROLES} from './role_enum'

export class Usuario {
    nombre = "";
    email = "";
    password = "";
    role = ROLES.USER;

    constructor(nombre, email, password, role) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}