import React, {useState, useRef, useMemo} from 'react'
import useList from '../hooks/useList'

const ListaTareas = () => {
    const tareas = useList(
        ['Revisar emails',
        'Ver la peli de Black Panther',
        "Actualizar los paquetes de Debian",
        "Actualizar los plugins del Neovim",
        "Hacer un backup de los dotfiles",
        "Subir la configuración del .config a GitHub"]
        );
    const [nuevaTarea, setNuevaTarea] = useState('');
    const tareaRef = useRef("");

    // Función que maneja el submit.
    const handleSubmit = (event) => {

        // Cancela el comportamiento por defecto.
        event.preventDefault();
        tareas.add(tareaRef.current.value);
        setNuevaTarea('');
        tareaRef.current.value = "";
    }

    return (
        <div>
            <h1>Tu lista de tareas</h1>
            <form className="task-form" onSubmit={handleSubmit}>
                <input ref={tareaRef} type="text" required placeholder='Introduce el nombre de la tarea' />
                <button type="submit">Crear tarea</button>
            </form>

            <hr/>

            <div className="task-controls">
                <button onClick={() => tareas.srt()}>Ordenar lista</button>
                <button onClick={() => tareas.rev()}>Invertir lista</button>
                <button onClick={() => tareas.clear()}>Borrar lista</button>
            </div>

            <hr/>

            {tareas.isEmpty() 
        ? (<h2>No tienes tareas pendientes</h2>) 
        : (<ul>
                {tareas.lista.map((tarea, indice) => (
                    <li key={indice}>
                        <input
                            onClick={() => tareas.remove(indice)}
                            defaultChecked={false}
                            type="checkbox"/>
                            {tarea}
                    </li>
                ))}
            </ul>)}
        </div>
    )
}

export default ListaTareas