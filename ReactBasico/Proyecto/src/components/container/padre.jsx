import React, {useState} from 'react'
import Hijo from '../pure/hijo'

export const Padre = () => {
  const [nombre, setNombre] = useState("Santos");

  function mostrarMensaje(texto) {
    alert(`Mensaje recibido: ${texto}`);
  }

  function actualizarNombre(nuevoNombre) {
    setNombre(nuevoNombre);
  }

  return (
    <div>
    <Hijo nombre={nombre} send={mostrarMensaje} update={actualizarNombre}></Hijo>
    </div>
  )
}

export default Padre;