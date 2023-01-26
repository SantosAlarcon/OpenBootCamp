import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.css'
import './styles/index.css'
import Clock from './components/Clock'
import ClockF from './components/ClockF'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ClockF/>
  </React.StrictMode>
)
