const fibonacci = (num) => {
    let lista = [0,1];

    for(let i = 2; i <= numero; i++) {
        lista.push(lista[i-1] + lista[i-2]);
    }

    return lista;
}

console.log(fibonacci(6));