import React, {useState} from "react";

const estiloLogueado = {
    color: 'blue'
}

const estiloDeslogueado = {
    color: 'tomato',
    fontWeight: 'bold'
}

const SaludoEstilo = (props) => {
    const [logged, setLogged] = useState(false);

    return (
        <div style={logged ? estiloLogueado : estiloDeslogueado}>
        {logged ? <p>Hola, {props.nombre}</p> : <p>Por favor, inicia sesión.</p>}
        <button onClick={() => {
            console.log("Pene");
            setLogged(!logged);
        }}>{logged ? "Cerrar sesión" : "Iniciar sesión"}</button>
        </div>
    )
}

export default SaludoEstilo;