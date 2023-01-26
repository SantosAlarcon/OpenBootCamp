import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const FormLogin = () => {
  const navegar = useNavigate();

  const nombreRef = useRef("");
  const passwordRef = useRef("");

  function irARegistro(e) {
    e.preventDefault();
    navegar('/registro');
  }

  function iniciarSesion(e) {
    e.preventDefault();
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuario"));

    if (usuarioActual !== null) {
      if (usuarioActual.nombre === nombreRef.current.value && usuarioActual.password === passwordRef.current.value) {
        navegar('/tareas');
      }
      else {
        alert("Los datos son incorrectos.");
        passwordRef.current.value = "";
      }
    } else {
      alert("Los datos son incorrectos.");
      nombreRef.current.value = "";
      passwordRef.current.value = "";
    }
  }

  return (
    <div>
      <h1 className='py-4'>Iniciar sesión</h1>
      <form className='d-flex flex-column gap-4' onSubmit={iniciarSesion}>
        <label htmlFor="nombre">Nombre de usuario: </label>
        <input ref={nombreRef} required className="form-control" type="text" name="nombre" />
        <label htmlFor="password">Contraseña: </label>
        <input ref={passwordRef} required className="form-control" type="password" name="password" />

        <div className='d-flex gap-4 justify-content-center'>
          <button className="btn btn-primary">Iniciar sesión</button>
          <button className="btn btn-primary" onClick={irARegistro}>Registro</button>
        </div>
      </form>
    </div>
  )
}

export default FormLogin