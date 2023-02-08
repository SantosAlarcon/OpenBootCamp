import React, {useState} from 'react'

const useList = (initialValue = []) => {
    const [lista, setLista] = useState(initialValue);

    // Añade un elemento a la lista al final de la misma.
    const add = (element) => setLista(listaAntigua => [...listaAntigua, element]);

    // Borra un elemento de la lista a partir del índice.
    const remove = (indice) => setLista(listaAntigua => listaAntigua.filter((_, i) => i !== indice));

    // Ordena los elementos de la lista en órden ascendente.
    const srt = () => setLista(listaAntigua => [...listaAntigua].sort((a,b) => a < b ? -1 : 0));

    // Invierte el órden de todos los elementos.
    const rev = () => setLista(listaAntigua => [...listaAntigua].reverse());

    // Comprueba si está la lista vacía.
    const isEmpty = () => lista.length === 0 ? true : false;

    // Borra todos los elementos de la lista.
    const clear = () => setLista([]);

    return {lista, setLista, add, remove, srt, rev, isEmpty, clear};
}

export default useList