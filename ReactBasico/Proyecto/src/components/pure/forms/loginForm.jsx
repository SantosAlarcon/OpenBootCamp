import React, { useState } from 'react'

export const loginForm = () => {
    const credencialesIniciales = {
        usuario: '',
        password: ''
    };

    const [credenciales, setCredenciales] = useState(credencialesIniciales);
  return (
    <div>loginForm</div>
  )
}
