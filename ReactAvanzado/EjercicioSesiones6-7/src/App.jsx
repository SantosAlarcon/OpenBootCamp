import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {

  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const obtenerNotificacion = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/subscription", 
      JSON.stringify({title: titulo, body: mensaje}), {
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }});
    } catch (error) {
      console.log(error);
    }

    setTitulo("");
    setMensaje("");
  }

  return (
    <div className="App">
      <h1>Crear notificación</h1>

      <form className='formulario' onSubmit={obtenerNotificacion}>
        <label htmlFor='titulo'>Título</label>
        <input name="titulo" type="text" onChange={(e) => setTitulo(e.target.value)} required placeholder='Introduce tu titulo aquí' value={titulo} />
        <label htmlFor='titulo'>Mensaje</label>
        <input name="mensaje" type="text" onChange={(e) => setMensaje(e.target.value)} required placeholder='Introduce tu mensaje aquí' value={mensaje} />
        <button type="submit">Mostrar notificación</button>
      </form>
    </div>
  )
}

export default App
