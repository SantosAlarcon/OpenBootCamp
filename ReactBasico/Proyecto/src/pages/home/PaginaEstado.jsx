import React from 'react'
import { useLocation } from 'react-router-dom'

const PaginaEstado = () => {
    const location = useLocation();

  return (
    <div>
        <h1>Estado: {location.state.online ? "El usuario está CONECTADO" : "El usuario está DESCONECTADO"}</h1>
    </div>
  );
}

export default PaginaEstado;