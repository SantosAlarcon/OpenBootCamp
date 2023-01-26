/**
 * Ejemplo de Hooks:
 * - useState()
 * - useContext()
 */

import React, { useState, useContext, createContext } from 'react'

const miContexto = createContext(null);

const Componente1 = () => {
    // Se crea un estado vacío en null, que luego se rellenará con los
    // datos del padre.
    const state = useContext(miContexto);

    return (
        <div>
            <h1>
                El token es: {state.token}.
            </h1>
            <Componente2 />
        </div>
    )
}

const Componente2 = () => {
    const state = useContext(miContexto);

    return (
        <div>
            <h2>
                La sesión es: {state.sesion}
            </h2>
        </div>
    )
}

export default function MiComponenteContexto() {
    const estadoInicial = {
        token: '123456',
        sesion: 1
    }

    const [datosSesion, setDatosSesion] = useState(estadoInicial);

    function actualizarSesion() {
        setDatosSesion({
            token: 'Peperino',
            sesion: datosSesion.sesion + 1
        })
    }

    return (
        <miContexto.Provider value={datosSesion}>
            <Componente1 />
            <button onClick={actualizarSesion}>Actualizar sesión</button>
        </miContexto.Provider>
    )
}