import React, { useState, useEffect } from 'react'
import { NIVELES } from '../../models/nivel_enum';
import { Tarea } from '../../models/claseTarea'

const ListaTareas = () => {
    const tareaPorDefecto = new Tarea("Hacer backup", "Realizar un backup de la carpeta de anime",false, NIVELES.NORMAL);

    // Estado del componente
    const [tareas, setTareas] = useState([tareaPorDefecto]);
    const [cargando, setCargando] = useState(true);

    //Control del ciclo de vida del componente
    useEffect(() => {
      console.log("Modificación de tareas");
      setCargando(false);
    
      return () => {
        console.log("El componente de la lista va a desaparecer");
      }
    }, [tareas]);
    

    const cambioCompletado = (id) => {
        console.log("Cambio de estado de una tarea");
    }

    return (
        <div>
            <h1>Lista de tareas: </h1>
            {/* TODO: Aplicar un map aquí para devolver todas las tareas. */}
            <ListaTareas Tarea={tareaPorDefecto}></ListaTareas>
        </div>
    );
};

export default ListaTareas;