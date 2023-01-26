import React, { useState, useEffect } from 'react'
import { NIVELES } from '../../models/nivel_enum';
import Tarea from '../../models/claseTarea'
import FormularioTareas from '../pure/forms/FormularioTareas';
import CompTarea from '../pure/CompTarea'
import { CSSTransition } from 'react-transition-group';

const CompListadoTareas = () => {
    const tareaPorDefecto = new Tarea("Hacer backup", "Realizar un backup de la carpeta de anime", false, NIVELES.NORMAL);
    const tareaPorDefecto2 = new Tarea("Hacer backup", "Realizar un backup de la carpeta HOME de la distro de Debian", false, NIVELES.URGENTE);
    const tareaPorDefecto3 = new Tarea("Cagarse en Dios de los panchitos", "Pues eso...", false, NIVELES.BLOQUEANDO);

    const [tareas, setTareas] = useState([tareaPorDefecto, tareaPorDefecto2, tareaPorDefecto3]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setCargando(false);
        }, 2000);
    }, [tareas])

    function completarTarea(tarea) {
        console.log("THIS!!!");
        const indice = tareas.indexOf(tarea);

        // Se crea una variable temporal
        const tempTareas = [...tareas];

        tempTareas[indice].completada = !tempTareas[indice].completada;

        // Se actualiza el estado del componente/tarea que se ha cambiado el estado.
        setTareas(tempTareas);
    }

    function borrarTarea(tarea) {
        console.log("Borrando espero, a la waifu que yo quiero");
        const indice = tareas.indexOf(tarea);

        // Se crea una variable temporal
        const tempTareas = [...tareas];

        // Se elimina del array el elemento que se encuentre en el índice.
        tempTareas.splice(indice, 1);

        // Se actualiza el estado del componente/tarea que se ha cambiado el estado.
        setTareas(tempTareas);
    }

    const crearTarea = (tarea) => {
        // Se crea una variable temporal
        const tempTareas = [...tareas];

        // Se añade la tarea al array.
        tempTareas.push(tarea);

        // Se actualiza el estado del componente/tarea que se ha cambiado el estado.
        setTareas(tempTareas);
    }

    return (
        <div>
            <h1 className='pb-4'>Lista de tareas</h1>
            {cargando ? <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div> : tareas?.length > 0 ?
                tareas.map((tarea, index) => {
                    return (
                        <CompTarea
                            key={index}
                            tarea={tarea}
                            completar={completarTarea}
                            borrar={borrarTarea}
                        >
                        </CompTarea>
                    )
                }) /* Si no hay tareas, se muestra un mensaje advirtiendo que no hay tareas */
                : <div><h1 className='pb-4'>No hay tareas que mostrar 👍👍👍</h1></div>}

            <FormularioTareas add={crearTarea}></FormularioTareas>
        </div>
    );
};

export default CompListadoTareas;