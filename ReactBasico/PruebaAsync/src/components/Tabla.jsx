import React, { useEffect, useState } from 'react'

const Tabla = () => {
    const [datos, setDatos] = useState([]);

    const devolverDatos = async() => {
        const data = await fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .catch(error => console.log("Error al obtener los datos."));

        setDatos(data.data);
    }

    useEffect(() => {
        devolverDatos();
    }, [])
    return (
        <div>
            {datos.length > 0 ?

            <table className='tabla'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>E-Mail</th>
                    <th>Imágen</th>
                </tr>
            </thead>
            <tbody>
            {datos.map(dato => {
                return [
                    <tr key={dato.id}>
                        <td>{dato.first_name}</td>
                        <td>{dato.last_name}</td>
                        <td>{dato.email}</td>
                        <td>{<img src={dato.avatar}/>}</td>
                    </tr>
                ];
            })
            }
            </tbody></table>
            
            : <h1>No hay datos</h1>}
        </div>
    )
}

export default Tabla