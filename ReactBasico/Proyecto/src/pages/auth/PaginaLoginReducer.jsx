import React, {useReducer} from 'react'
import { Await } from 'react-router-dom';

// Actions
const CAMPO = "CAMPO";
const LOGIN = "LOGIN";
const SUCCESS = "SUCESS";
const ERROR = "ERROR";
const LOGOUT = "LOGOUT";

// Reducer
const loginReducer = (estado, action) => {
    switch (action.type) {
        case CAMPO:
            return {
                ...estado,
                [action.nombreCampo]: action.payload
            }
        case LOGIN:
            return {
                ...estado,
                estaCargando: true
            }
        case SUCCESS:
            return {
                ...estado,
                estaCargando: false,
                logueado: true
            }
        case ERROR:
            return {
                ...estado,
                estaCargando: false,
                logueado: false,
                error: "Nombre de usuario o contraseña no válidos",
                nombre: "",
                password: ""
            }
        case LOGOUT:
            return {
                ...estado,
                logueado: false,
            }
    }
}


const estadoInicial = {
    nombre: "",
    password: "",
    estaCargando: "",
    error: "",
    logueado: false
}

const PaginaLoginReducer = () => {

    const [estado, dispatch] = useReducer(loginReducer, estadoInicial)

    // Obtener todas las variables
    const {nombre, password, estaCargando, error, logueado } = estado

    const submit = async (e) => {
        // Previene el comportamiento por defecto del "submit".
        e.preventDefault();

        // Lanzamos la acción del LOGIN
        dispatch({type: LOGIN});


        // PENDIENTE: No gestiona bien cuando falla el login.
        try {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (nombre === "admin" && password === "admin") {
                        resolve();
                    } else {
                        reject();
                    }
                }, 2000);
            })
            dispatch({type: SUCCESS});
        } catch (error) {
            dispatch({type: ERROR});
        }
    }

  return (
    <div>
    {
        logueado ? (
            <div>
                <h1>¡Bienvenid@, {nombre}!</h1>
                <button onClick={() => {dispatch({type: LOGOUT})}}>Cerrar sesión</button>
            </div>
        ) :
        (
            <form className="d-flex gap-3 flex-column" onSubmit={submit}>
            {
                error && <p style={{color: 'tomato'}}>{error}</p>
            }
                <input className="form-control" type="text" required placeholder='Introduce tu nombre de usuario'
                value = {nombre}
                onChange = {(e) => dispatch({
                    type: CAMPO,
                    nombreCampo: 'nombre',
                    payload: e.currentTarget.value}
                )}/>
                <input className="form-control" value={password} type="password" required placeholder='Introduce tu contraseña' 
                onChange = {(e) => dispatch({
                    type: CAMPO,
                    nombreCampo: 'password',
                    payload: e.currentTarget.value}
                )}/>
                <button className='btn btn-primary' type="submit">{estaCargando ? "Cargando..." : "Iniciar sesión"}</button>
            </form>
        )
    }
    </div>
  )
}

export default PaginaLoginReducer