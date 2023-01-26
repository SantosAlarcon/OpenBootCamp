import React from 'react'
import Contacto from './components/Contacto'
import CompContacto from './components/CompContacto'
import './App.css'

const App = () => {
const contacto1 = new Contacto("Pepe","Viyuela","pepeviyuela@gmail.com",true);

  return (
    <CompContacto contacto={contacto1}></CompContacto>
  )
}

export default App