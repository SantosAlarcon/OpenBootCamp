import React from 'react'
import { useRef } from 'react'
import PropTypes from 'prop-types';

const TodoForm = ({ submit }) => {
    const tareaRef = useRef('');

    const crearTarea = (e) => {

        // Cancela el comportamiento por defecto del "submit".
        e.preventDefault();

        // Se pasa la función "submit" con el texto del formulario.
        submit(tareaRef.current.value);

        // Se elimina el texto después de añadir la tarea.
        tareaRef.current.value = "";
    }

    return (
        <div>
            <form onSubmit={crearTarea}  className='todo-form'>
                    <input ref={tareaRef} type="text" placeholder='Introduce el nombre de la tarea' required />
                    <button type="submit" >Añadir tarea</button>
            </form>
        </div>
    )
}

TodoForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default TodoForm