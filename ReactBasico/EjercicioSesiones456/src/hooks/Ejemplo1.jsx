import React, { useState } from 'react'

const Ejemplo1 = () => {
    const valorInicial = 0;

    const personaInicial = {
        nombre: "Santos",
        email: "santosalarcon86@gmail.com"
    }

    const [contador, setContador] = useState(valorInicial);
    const [persona, setPersona] = useState(personaInicial);

    function incContador() {
        setContador(valorInicial + 1);
    }

    const actualizarPersona = () => {
        setPersona(
            {
                nombre: "Pepe",
                email: "pepeviyuela@gmail.com"
            }
        )
    }

  return (
    <div>
    <h1>*** Ejemplo de useState() ***</h1>
    <h2>Contador: {contador}</h2>
    <h2>Datos de la persona:</h2>
    <h3>Nombre: {persona.nombre}</h3>
    <h4>Email: {persona.email}</h4>
    <div>
        <button onClick={incContador}>Aumentar contador</button>
        <button onClick={actualizarPersona}>Cambiar datos</button>
    </div>
    </div>
  )
}

export default Ejemplo1