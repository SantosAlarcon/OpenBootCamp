import React, {useState} from 'react'

const Cuadrado = () => {

    const estiloInicial = {
        'backgroundColor': 'rgb(0,0,0)',
        width: '255px',
        height: '255px'
    }

    const [estilo, setEstilo] = useState(estiloInicial);

    function cambiarColor() {
        const rojo = parseInt(Math.random()*255);
        const verde = parseInt(Math.random()*255);
        const azul = parseInt(Math.random()*255);
        const nuevoColor = `rgb(${rojo}, ${verde}, ${azul})`;
        const nuevoEstilo = {
            'backgroundColor': nuevoColor,
            width: '255px',
            height: '255px'
        }
        
        setEstilo(nuevoEstilo);
    }

    function restablecerColor() {
        setEstilo(estiloInicial);
    }

  return (
    <div onMouseOver={cambiarColor} onDoubleClick={restablecerColor} style={estilo}></div>
  )
}

export default Cuadrado