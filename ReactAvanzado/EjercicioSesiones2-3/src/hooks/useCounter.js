import React, { useState, useEffect } from 'react'

export const useCounter = (valorInicial = 0, min, max, step) => {
    // Inicializamos el estado del valor a 0.
    const [valor, setValor] = useState(valorInicial);

    return {
        valor: valor,

        // Se comprueba si el valor es inferior al máximo. Se incrementa si se
        // cumple. Si no se queda como está.
        increment: () => valor < max ? setValor(valor => valor + step) : alert("¡Se alcanzó el valor máximo!"),

        // Se comprueba si el valor es superior al mínimo. Se reduce si se
        // cumple. Si no se queda como está.
        decrement: () => valor > min ? setValor(valor => valor - step) : alert("¡Se alcanzó el valor mínimo!"),

        // Se restablece el valor al valor inicial.
        reset: () => setValor(valor => valorInicial),
    }
}

export default useCounter;