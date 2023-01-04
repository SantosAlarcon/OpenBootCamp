const nombre = "Santos";
const apellido = "Alarcón";
const estudiante = nombre.concat(" " + apellido);
const estudianteMinus = estudiante.toLowerCase();
const estudianteMayus = estudiante.toUpperCase();
const longitudEst = estudiante.length;
const primeraLetraN = nombre.charAt(0);
const ultimaLetraA = apellido.charAt(apellido.length-1);
const estudianteSinEspacios = estudiante.replace(/ /g,"");
const estaElNombre = estudiante.includes(nombre);

console.log(estaElNombre)
