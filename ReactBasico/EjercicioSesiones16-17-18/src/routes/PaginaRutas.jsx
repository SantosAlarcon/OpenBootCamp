import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FormLogin from '../components/FormLogin';
import FormTareas from '../components/FormTareas';
import FormRegistro from '../components/FormRegistro';

const PaginaRutas = () => {
    let logueado = sessionStorage.getItem("usuario");
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={
                        logueado !== null ? <Navigate to="/tareas" /> : <Navigate to="/login" />
                    } />
                    <Route exact path='/login' element={<FormLogin />} />
                    <Route exact path='/registro' element={<FormRegistro />} />
                    <Route exact path='/tareas' element={
                        logueado !== null ? <FormTareas /> : <Navigate to="/login" />
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default PaginaRutas