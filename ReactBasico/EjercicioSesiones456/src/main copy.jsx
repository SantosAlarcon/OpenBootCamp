import React from 'react'
import ReactDOM from 'react-dom/client'
import Ejemplo1 from './hooks/Ejemplo1'
import Ejemplo2 from './hooks/Ejemplo2'
import Ejemplo3 from './hooks/Ejemplo3'
import Ejemplo4 from './hooks/Ejemplo4'
import './styles/App.css'
import './styles/index.css'
import MiComponenteContexto from './hooks/Ejemplo3'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Ejemplo4 nombre="Santos">
    {/* Todo lo que hay dentro es tratado de 'props.children'. */}
      <h3>
        Contenido del props.children
      </h3>
    </Ejemplo4>
  </React.StrictMode>
)
