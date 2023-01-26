/**
 * Ejemplo para entender el uso de props.children
 */

import React from 'react'

export const Ejemplo4 = (props) => {
  return (
    <div>
    <h1>*** Ejemplo de CHILDREN.PROPS ***</h1>
    <h2>
        Nombre: {props.nombre}
    </h2>
    {
        /**
        props.children pintará por defecto aquello que se encuentre entre las etiquetas de este componente de órden superior.
         */
    }
    {props.children}
    </div>
  )
}

export default Ejemplo4;