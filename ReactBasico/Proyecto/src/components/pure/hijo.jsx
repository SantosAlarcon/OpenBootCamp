import React, { useRef } from 'react'

export const Hijo = ({ nombre, send, update }) => {
    const ref = useRef('');
    const nombreRef = useRef('');

    function pulsarBoton() {
        const texto = ref.current.value;
        console.log(`Texto en el input: ${texto} `);
    }

    function enviarNombre(e) {
        e.preventDefault();
        update(nombreRef.current.value);
    }

    return (
        <div style={{ display: 'flex', gap: '2em', flexDirection: 'column' }}>
        <div>
            <h3 onMouseOver={() => console.log("Ratón por encima")}>¡Hola, {nombre}!</h3>
            <button onClick={() => console.log("Botón 1 pulsado")}>Botón 1</button>
            <button onClick={pulsarBoton}>Botón 2</button>
            <input
                placeholder='Mándale un mensaje a tu padre'
                onFocus={() => console.log('Foco en el input...')}
                onChange={(e) => console.log('Se ha cambiado el input...:', e.target.value)}
                onCopy={() => console.log('Se ha copiado el texto del input...')}
                ref={ref}
            />
            <button onClick={() => send(ref.current.value)}>
                Enviar mensaje
            </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <form onSubmit={enviarNombre}>
                    <input ref={nombreRef} placeholder="Nuevo nombre" />
                    <button type='submit'>Actualizar nombre</button>
                </form>
            </div>
        </div>
    )
}

export default Hijo;