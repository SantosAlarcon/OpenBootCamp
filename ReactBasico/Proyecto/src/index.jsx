import React from 'react'
import ReactDOM from 'react-dom/client'
import Saludo from './saludo'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '../src/styles/index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Saludo nombre="Santos" /> */}
    <App />
  </React.StrictMode>
)
