import './App.css'
import useSessionStorage from './hooks/useSessionStorage'
import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/Routes'
import StickyFooter from './components/dashboard/StickyFooter';

function App() {
  const token: any = useSessionStorage("sessionJWTToken");

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>

          {(!token) && (
            <li><Link to="/login">Iniciar sesión</Link></li>
          )}

          {(!token) && (
            <li><Link to="/register">Registrarse</Link></li>
          )}

          <li><Link to="/katas">Katas</Link></li>
        </ul>
      </nav>
      <AppRoutes />
      <StickyFooter />
    </>
  )
}

export default App
