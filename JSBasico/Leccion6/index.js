// Lista de la compra
const listaCompra = [
    {nombre: "Crema de orujo", precio: 6.0},
    {nombre: "Pack 30 Rebanadas integrales", precio: 0.85},
    {nombre: "Café Natural Solubre", precio: 1.45},
    {nombre: "Pasta de dientes Colgate", precio: 1.5},
    {nombre: "Lejía Fregasuelos", precio: 0.95},
];

// Modifica la lista de la compra añadiendo al final un nuevo elemento.
listaCompra.push({nombre: "Aceite de Girasol", precio: 2.0});

// Se borra el último objeto de la lista
listaCompra.pop();


// Lista de películas
const listaPelis = [
    {nombre: "El Señor de los Anillos: El Retorno del Rey", director: "Peter Jackson", fecha: 2003},
    {nombre: "Vengadores: Endgame", director: "Hermanos Russo", fecha: 2019},
    {nombre: "Star Trek (Reboot)", director: "J.J. Abrams", fecha: 2009}
];

// Se crea una lista de películas posteriores a 2010.
const pelisPosteriores2010 = listaPelis.filter(peli => peli.fecha > 2010);

// Se crea un mapa con los directores de la lista anterior.
const directores = listaPelis.map(peli => peli.director);

// Se crea un mapa con el nombre de las películas.
const nombrePelis = listaPelis.map(peli => peli.nombre);

// Se crea una lista que concatene los directores y las películas
const directoresPelis = directores.concat(nombrePelis);

// Se crea una lista que concatene los directores y las películas usando
// el factor de propagación.
const directoresPelisFP = {...nombrePelis, ...directores};

console.log(directoresPelisFP)
