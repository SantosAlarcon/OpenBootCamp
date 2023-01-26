import React, {useEffect} from 'react';

const TodosLosCiclos = () => {
    useEffect(() => {
        console.log("Componente creado");

        const intervalID = setInterval(() => {
            document.title = `${new Date()}`;
            console.log("El componente se actualiza.");
        }, 1000);

        return () => {
            console.log("El componente va a desaparecer");
            document.title = "Tiempo detenido";
            clearInterval(intervalID);
        }
    }, []);
}

export default TodosLosCiclos;