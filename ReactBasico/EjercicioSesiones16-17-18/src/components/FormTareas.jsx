import React from 'react'

const FormTareas = () => {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  
  return (
    <div className='d-flex flex-column gap-4'>
      <h1>Lista de tareas</h1>
      <h3>Bienvenid@ a tu lista de tareas, {usuario.nombre}.</h3>

      <ul>
        <li>Tarea 1</li>
        <li>Tarea 2</li>
        <li>Tarea 3</li>
      </ul>
    </div>
  )
}

export default FormTareas