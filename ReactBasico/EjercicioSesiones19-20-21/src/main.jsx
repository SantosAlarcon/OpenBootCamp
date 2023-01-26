import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Chistes from './components/Chistes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Chistes />
  </React.StrictMode>,
)
