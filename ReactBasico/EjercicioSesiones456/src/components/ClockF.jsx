import React, { Component, useState, useEffect, useRef } from 'react'

const ClockF = () => {
   // Se declara el estado inicial.
   const estadoInicial = {
      fecha: new Date(),
      edad: 0,
      nombre: 'Santos',
      apellidos: 'Alarcón Asensio'
   };

   // Se crean los estados
   const [estado, setEstado] = useState(estadoInicial);
   const [edad, setEdad] = useState(estado.edad);
   const [fecha, setFecha] = useState(estado.fecha);

   /**
    * La función tick se encarga de sumar 1 a la edad y crear una
    * nueva fecha.
    */
   function tick() {
      setEdad(estado.edad += 1);
      setFecha(estado.fecha = new Date());
   }

   useEffect(() => {
      // Aquí se controla el ciclo de vida del componente.
      const timerID = setInterval(tick, 1000);

      // Esta parte se ejecuta cuando el componente está a punto de desaparecer.
      return () => {
         clearInterval(timerID);
      }
   }, []);

   return (
      <div>
         <h2>
            Hora Actual: {estado.fecha.toLocaleTimeString()}
         </h2>
         <h3>{estado.nombre} {estado.apellidos}</h3>
         <h1>Edad: {estado.edad}</h1>
      </div>
   )
}

export default ClockF;