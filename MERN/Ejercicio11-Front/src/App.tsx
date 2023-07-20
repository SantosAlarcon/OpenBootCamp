import './App.css'
import { Routes, Router, Route, Link, Navigate } from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import KatasPage from './pages/KatasPage'
import HomePage from './pages/HomePage'
import KatasDetailPage from './pages/KatasDetailPage'
import useSessionStorage from './hooks/useSessionStage'

function App() {
  const haIniciadoSesion: any = useSessionStorage("sessionJWTToken");

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>

          {(!haIniciadoSesion && haIniciadoSesion === false) && (
            <li><Link to="/login">Iniciar sesión</Link></li>
          )}

          {(!haIniciadoSesion && haIniciadoSesion === false) && (
            <li><Link to="/register">Registrarse</Link></li>
          )}

          <li><Link to="/katas">Katas</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/katas' element={<KatasPage />}></Route>
        <Route path='/katas/:id' element={<KatasDetailPage />}></Route>
        <Route path='*' element={<Navigate to="/" replace />}></Route>
      </Routes>
    </>
  )
}

export default App
