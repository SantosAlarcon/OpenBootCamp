import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AgendaContactos from './components/AgendaContactos'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <AgendaContactos />
  </React.StrictMode>,
)
