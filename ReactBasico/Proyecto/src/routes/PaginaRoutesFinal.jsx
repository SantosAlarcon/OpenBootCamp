import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

import PaginaInicio from '../pages/home/PaginaInicio';
import PaginaEstado from '../pages/home/PaginaEstado';
import NotFoundPage from '../pages/404/NotFoundPage';
import PaginaPerfil from '../pages/profile/PaginaPerfil';
import AboutPage from '../pages/about/AboutPage';
import PaginaTareas from '../pages/tareas/paginaTareas'
import FormularioLogin from '../components/pure/forms/LoginFormik'
import PaginaLoginReducer from "../pages/auth/PaginaLoginReducer";
import Dashboard from "../pages/dashboard/Dashboard";

const PaginaRoutesFinal = () => {
    let logueado = true;
  
    return (
    <Router>
        <Routes>
            <Route exact path="/" element={
                logueado ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }>
            </Route>
            <Route exact path="/login" element={<PaginaLoginReducer/>} />
            <Route exact path="/dashboard" element=
            {
                logueado ? <Dashboard /> : <Navigate to="/login" />
            }>
            </Route>
            <Route element={<NotFoundPage />}/>
        </Routes>
    </Router>
  )
}

export default PaginaRoutesFinal