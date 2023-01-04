const nombre = "Santos";
const apellidos = "Alarcón Asensio";

class Persona {
    nombre;
    apellidos;

    constructor(nombre, apellidos) {
        this.nombre = nombre;
        this.apellidos = apellidos;
    }
}

// Se crea un objeto de la clase Persona
const p1 = new Persona(nombre, apellidos);

// Se guardan los datos de ese objeto en el almacenamiento de sesión y local, convirtiendolo en formato JSON.
sessionStorage.setItem("Persona", JSON.stringify(p1));
localStorage.setItem("Persona", JSON.stringify(p1));

// Se crea una cookie que caduca a los 2 minutos con el objeto anterior.
const fecha = new Date();
document.cookie = "PersonaCookie=" + p1.nombre + "," + p1.apellidos + "; expires=" + fecha.setTime(fecha.getTime() + (120 * 1000)) + fecha.toGMTString();