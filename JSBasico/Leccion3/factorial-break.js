let resultado = 10;
let numero = 10;

do {
    if (numero == 0) {
        break;
    } else {
    numero--;
    resultado *= numero;
    }
} while (numero > 1)

console.log(resultado)
