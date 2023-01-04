const familia = new Set();
familia.add("Santos").add("Maria Josefa").add("Felix").add("Vicente");

// Se tendría que añadir el mismo nombre, pero no lo hace porque en un
// set no se admiten valores repetidos.
familia.add("Santos");

// Se añade un nuevo miembro a la familia, que es JavaScript, que este
// no está repetido.
familia.add("JavaScript");

console.log(familia);
