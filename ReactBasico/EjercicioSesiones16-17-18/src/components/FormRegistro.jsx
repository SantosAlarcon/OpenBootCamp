import React, { useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const FormRegistro = () => {
  const nombreRef = useRef('');
  const passwordRef = useRef('');
  const passwordRefC = useRef('');
  const navigate = useNavigate();

  const crearUsuario = (e) => {
    e.preventDefault();
    if (passwordRef.current.value == passwordRefC.current.value) {
      const nuevoUsuario = {
        nombre: nombreRef.current.value,
        password: passwordRef.current.value,
        logueado: true
      }

      sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
      navigate("/tareas");
    }
    else {
      alert("Las contraseñas no coinciden.");
    }
  }

  return (
    <div>
      <h1>Registrar registro</h1>
      <form className='d-flex flex-column gap-4'>
        <label htmlFor='nombre'>Nombre de usuario: </label>
        <input className="form-control" ref={nombreRef} placeholder="Introduce tu nombre de usuario" required type="text" name="nombre"/>
        <label htmlFor='password'>Contraseña: </label>
        <input className="form-control" ref={passwordRef} placeholder="Introduce tu contraseña" required type="password" name="password"/>
        <label htmlFor='passwordC'>Contraseña: </label>
        <input className="form-control" ref={passwordRefC} placeholder="Confirma la contraseña" required type="password" name="passwordC"/>
        <button type="submit" onClick={crearUsuario}>Crear usuario</button>
      </form>
    </div>
  )
}

export default FormRegistro