import React, { useRef, useState } from 'react'

const useBoolean = (valorInicial) => {
    const [valor, setValor] = useState(valorInicial);

    const actualizarValor = useRef(
        {
            // Conmuta el estado del booleano
            toggle: () => setValor(valorAntiguo => !valorAntiguo),

            // Activa el valor del booleano como TRUE
            on: () => setValor(true),

            // Desactivar el valor del booleano como FALSE
            off: () => setValor(false)
        }
    )
  return [valor, actualizarValor.current]
}

export default useBoolean