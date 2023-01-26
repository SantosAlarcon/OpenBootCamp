import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Cuadrado from './components/Cuadrado'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Cuadrado></Cuadrado>
  )
}

export default App
