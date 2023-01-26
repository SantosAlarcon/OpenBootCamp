import React from 'react'
import {useNavigate} from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
        <h1>Error 404</h1>
        <h3>No se ha encontrado el recurso especificado.</h3>
        <button onClick={ () => useNavigate('/')}>Volver al menú principal</button>
    </div>
  )
}

export default NotFoundPage