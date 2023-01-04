// Función 1
function siempreTrue() {
    return true;
}

// Función 2
function asincrona() {
    console.log("Hola, soy una promesa");
}

// Función 3
function* generaIndices() {
    let index = 0

    while (true) {
        index++;
        if (index % 2 == 0) {
            yield index;
        }
    }
}

siempreTrue();

const async = setTimeout(asincrona, 5000);
const gen = generaIndices();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
