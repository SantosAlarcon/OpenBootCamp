import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Contacto from '../models/claseContacto'

const FormularioContacto = ({add}) => {
    const nombreRef = useRef('nombre');
    const apellidosRef = useRef('apellidos');
    const emailRef = useRef('email');
    const telefonoRef = useRef('telefono');

    function crearTarea(e) {
        e.preventDefault();

        const nuevoContacto = new Contacto(
            nombreRef.current.value,
            apellidosRef.current.value,
            telefonoRef.current.value,
            emailRef.current.value,
            true
        );

        add(nuevoContacto);

        // Restablecer los inputs tras añadir la tarea
        nombreRef.current.value = '';
        apellidosRef.current.value = '';
        telefonoRef.current.value = '';
        emailRef.current.value = '';
    }

    return (
        <form className='pt-8 grid grid-cols-2 grid-rows-3 gap-5 items-center' onSubmit={crearTarea}>
            <div>
                <label className='font-bold pr-4' htmlFor="nombre" id="nombre">Nombre:</label>
                <input autoFocus className='rounded-2xl p-2' required ref={nombreRef} id="nombre" type="text" />
            </div>
            <div>
                <label className='font-bold pr-4' htmlFor="apellidos" id="apellidos">Apellidos:</label>
                <input className='rounded-2xl p-2' required ref={apellidosRef} id="apellidos" type="text" />
            </div>
            <div>
                <label className='font-bold pr-4' htmlFor="email" id="email">Email:</label>
                <input className='rounded-2xl p-2' required ref={emailRef} id="email" type="email" />
            </div>
            <div>
                <label className='font-bold pr-4' htmlFor="telefono" id="telefono">Teléfono:</label>
                <input className='rounded-2xl p-2' required ref={telefonoRef} id="telefono" type="text" />
            </div>
            <div className='col-span-2'>
                <button className='bg-blue-500 rounded-2xl' type='submit'>Crear contacto</button>
            </div>
        </form>
    )
}

FormularioContacto.propTypes = {
    add: PropTypes.func.isRequired
}

export default FormularioContacto