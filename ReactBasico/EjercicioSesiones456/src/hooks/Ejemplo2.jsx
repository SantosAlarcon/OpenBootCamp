/**
 * Ejemplo de uso de:
 * - useState()
 * - useRef()
 * - useEffect()
 */

import React, { useState, useRef, useEffect} from 'react';

const Ejemplo2 = () => {
    // Creamos dos contadores distintos, cada uno con un estado diferente.
    const [contador1, setContador1] = useState(0);
    const [contador2, setContador2] = useState(0);

    const miRef = useRef();

    const incrementar1 = () => {
        setContador1(contador1+1);
    }

    const incrementar2 = () => {
        setContador2(contador2+1);
    }

    /**
     * Cada vez que haya un cambio en el estado, se ejecuta aquello que esté
     * dentro del useEffect().
     */
/*     useEffect(() => {
        console.log("Cambio en el estado del componente");
        console.log("Mostrando referencia al elemento del DOM:")
        console.log(miRef);
    })
 */

    /**
     * CASO 2: Ejecutar sólo cuando se cambie el Contador1.
     */

    useEffect(() => {
        console.log("Cambio en el estado del CONTADOR 1");
        console.log("Mostrando referencia al elemento del DOM:")
        console.log(miRef);
    }, [contador1]);

    return (
        <div>
            <h1>Ejemplo de useState(), useEffect() y useRef()</h1>
            <h2>Contador 1: {contador1}</h2>
            <h2>Contador 2: {contador2}</h2>
            <h4 ref={miRef}>
                Ejemplo de elemento referenciado
            </h4>

            <div>
                <button onClick={incrementar1}>Incrementar contador 1</button>
                <button onClick={incrementar2}>Incrementar contador 2</button>
            </div>
        </div>
    );
}

export default Ejemplo2;