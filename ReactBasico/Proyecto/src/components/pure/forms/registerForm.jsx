import React, { useState } from 'react'

export const registerForm = () => {
    const datosIniciales = {
        usuario: '',
        nombre: '',
        email: '',
        password: ''
    };

    const [datos, setDatos] = useState(datosIniciales);
  return (
    <div>registerForm</div>
  )
}
