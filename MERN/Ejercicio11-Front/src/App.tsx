import './App.css'
import { Routes, Router, Route, Link, Navigate } from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import KatasPage from './pages/KatasPage'
import HomePage from './pages/HomePage'
import KatasDetailPage from './pages/KatasDetailPage'
import useSessionStorage from './hooks/useSessionStage'

function App() {
  const haIniciadoSession: boolean = useSessionStorage("sessionJWTToken");

  return (
    <>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>

            {!haIniciadoSession && (
              <li><Link to="/login">Iniciar sesión</Link></li>
            )}

            {!haIniciadoSession && (
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
      </Router>
    </>
  )
}

export default App
