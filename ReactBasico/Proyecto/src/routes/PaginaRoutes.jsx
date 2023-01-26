import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import PaginaInicio from '../pages/home/PaginaInicio';
import PaginaEstado from '../pages/home/PaginaEstado';
import NotFoundPage from '../pages/404/NotFoundPage';
import PaginaPerfil from '../pages/profile/PaginaPerfil';
import AboutPage from '../pages/about/AboutPage';
import PaginaTareas from '../pages/tareas/paginaTareas'
import FormularioLogin from '../components/pure/forms/LoginFormik'
import PaginaLoginReducer from "../pages/auth/PaginaLoginReducer";

export const PaginaRoutes = () => {
    let logueado = false;
    const [usuario, setUsuario] = useState(null);

    const props = (ruta) => {
        location.push({
            ruta: ruta,
            buscar: '?online=true',
            estado: {
                online: true
            }
        });
    }

    useEffect(() => {
        logueado = localStorage.getItem('credentials');
    }, [])

    return (
        <Router>
            <div className="d-flex w-100">
                <aside className="d-flex flex-column gap-5 justify-content-start p-5 w-25 align-items-start">
                    <Link to='/'>Inicio</Link>
                    <Link to='/estado'>Estado</Link>
                    <Link to='/profile'>Perfil del usuario</Link>
                    <Link to='/login'>Iniciar sesión</Link>
                    <Link to='/tareas'>Lista de tareas</Link>
                    <Link to='/about'>Acerca de</Link>
                </aside>

                <main className="w-100 p-5">
                    <Routes>
                        <Route exact path='/' element={<PaginaInicio/>} />
                        <Route exact path='/estado' element={<PaginaEstado/>} />
                        <Route path='/about' element={<AboutPage/>} />
                        <Route path='/login' element={<PaginaLoginReducer/>} />
                        <Route path='/tareas' element={<PaginaTareas/>} />
                        <Route path='/profile' element=
                        {
                            logueado ? 
                                <PaginaPerfil />
                                : <FormularioLogin />
                        }>
                        </Route>
                        <Route element={<NotFoundPage/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default PaginaRoutes;