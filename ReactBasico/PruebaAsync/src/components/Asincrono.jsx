import React from 'react'
import Tabla from './Tabla';

const Asincrono = () => {
    async function generarNumeroPromesa() {
        return Promise.resolve(4);
    }

    function obtenerNumeroPromesa() {
        generarNumeroPromesa()
            .then(resolve => console.log("La respuesta es ", resolve, "."))
            .catch(error => console.log("Ha ocurrido un error."))
    }

    async function obtenerMensajePromesa() {
        let promesa = new Promise((resolve, reject) => {
            setTimeout(() => resolve("Momota Momo"), 2000);
        });

        const message = await promesa;

        await console.log(`Mensaje recibido: ${message}.`);
    }

    const devolverError = async() => {
        await Promise.reject(new Error("Cómeme los huevos!!!"));
    }

    const consumirError = () => {
        devolverError()
            .then(() => alert("El comando se ha ejecutado bien"))
            .catch(error => alert(`Ha habido un error TÓ GUAPO.\nMotivo del error: ${error.message}.`))
            .finally(() => alert("Esto se ejecuta SÍ o SÍ!!!"))
    }

    const multiplesPromesas = async() => {
        const resultados = await Promise.all(
            [
                fetch('https://reqres.in/api/users'),
                fetch('https://reqres.in/api/users?page=2'),
            ]
        ).then(response => console.table(response))
        .catch(error => alert("Error al obtener los datos"));
    }

  return (
    <div className='asinc'>
        <button onClick={obtenerNumeroPromesa}>Obtener número</button>
        <button onClick={obtenerMensajePromesa}>Obtener mensaje</button>
        <button onClick={consumirError}>Obtener error</button>
        <button onClick={multiplesPromesas}>Multiples promesas</button>
        <Tabla />
    </div>
  )
}

export default Asincrono;