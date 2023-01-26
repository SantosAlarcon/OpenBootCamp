import React from 'react'

export const PaginaInicio = () => {

  const navegarA = (ruta) => {
    history.push(ruta);
  }
  return (
    <div>
      <h1>Pagina de Inicio</h1>
      <h2>Dashboard</h2>
    </div>
  )
}

export default PaginaInicio;