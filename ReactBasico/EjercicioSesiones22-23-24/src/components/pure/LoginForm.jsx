import React from 'react'
import PropTypes from 'prop-types'
import { useRef } from 'react'

const LoginForm = ({logged, fetching, onLogin}) => {
    const valoresIniciales = {
        email: "",
        password: ""
    }

    const emailRef = useRef(valoresIniciales.email);
    const passwordRef = useRef(valoresIniciales.password);

    const iniciarSesion = async(e) => {
        e.preventDefault();
        onLogin(emailRef.current.value, passwordRef.current.value);

        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

  return (
    <div>
        <h1>Iniciar sesión</h1>
        <form onSubmit={iniciarSesion} className='login-form'>
            <div>
            <label htmlFor="email">Email:</label>
            <input ref={emailRef} name="email" type="email" required placeholder='Introduce el correo electrónico'/>
            </div>
            <div>
            <label htmlFor="password">Contraseña:</label>
            <input ref={passwordRef} name="pasword" type="password" required placeholder='Introduce la contraseña'/>
            </div>
            <button type="submit">Iniciar sesión</button>
            {fetching ? <p>Cargando los datos de inicio de sesión...</p> : null}
        </form>
    </div>
  )
}

LoginForm.propTypes = {
    logged: PropTypes.bool.isRequired,
    fetching:  PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired
}

export default LoginForm