import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Usuario} from '../../../models/claseUsuario'
import { ROLES } from '../../../models/role_enum';

const RegisterFormik = () => {
    const valoresIniciales = {
        nombre: "",
        email: "",
        password: "",
        confirm: "",
        role: ROLES.USER
    }

    const registerSchema = Yup.object().shape(
        {
            nombre: Yup.string()
                .min(7,"El nombre de usuario debe tener como mínimo 7 caracteres.")
                .max(12,"El nombre de usuario debe tener como máximo 12 caracteres.")
                .required("El nombre de usuario es OBLIGATORIO"),
            email: Yup.string().email('Formato de correo no válido').required("El email es OBLIGATORIO"),
            password: Yup.string()
                .min(8, "La contraseña tiene que tener más de 8 caracteres.")
                .required("La contraseña es OBLIGATORIA"),
            confirm: Yup.string()
                .when("password", {
                    is: value => {value && value.length > 0 ? true : false},
                    then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        '¡Las contraseñas deben coincidir!'
                    )
                }).required("Debes confirmar las contraseñas"),
            role: Yup.string().oneOf([ROLES.USER,ROLES.ADMIN]).required("El rol ES OBLIGATORIO")
        }
    )

    return (
        <div>
            <h4>Registro de usuario</h4>
            <Formik
                // Se establecen los valores por defecto
                initialValues={valoresIniciales}

                // Se establece las reglas de validaación
                validationSchema={registerSchema}

                // Se configura el evento del onSubmit.
                onSubmit={async (valores) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));

                    const usuario = new Usuario(valores.nombre, valores.email, valores.password, valores.role);
                    alert(JSON.stringify(usuario, null, 2));
                }}>

                {/* Obtenemos las props de Formik */}

                {({
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                }) => (
                        <Form className='d-flex flex-column gap-3'>
                        <label htmlFor='nombre'>Nombre de usuario: </label>
                            <Field type="nombre" name="nombre" />

                            {
                                errors.nombre && touched.nombre &&
                                (
                                    <div className='alert alert-warning'>
                                        <ErrorMessage name='nombre'></ErrorMessage>
                                    </div>
                                )
                            }

                            <label htmlFor='email'>Correo electrónico: </label>
                            <Field type="email" name="email" />

                            {
                                errors.email && touched.email &&
                                (
                                    <div className='alert alert-warning'>
                                        <ErrorMessage name='email'></ErrorMessage>
                                    </div>
                                )
                            }

                            <label htmlFor='password'>Contraseña: </label>
                            <Field type="password" name="password" />

                            {
                                errors.password && touched.password &&
                                (
                                    <div className='alert alert-warning'>
                                        <ErrorMessage name='password'></ErrorMessage>
                                    </div>
                                )
                            }

                            <label htmlFor='confirm'>Confirmar contraseña: </label>
                            <Field type="password" name="confirm" />

                            {
                                errors.confirm && touched.confirm &&
                                (
                                    <div className='alert alert-warning'>
                                        <ErrorMessage name='confirm'></ErrorMessage>
                                    </div>
                                )
                            }

                            <label htmlFor='role'>Tipo de usuario: </label>
                            <select name='role'>
                                <option value={ROLES.USER}>Usuario</option>
                                <option value={ROLES.ADMIN}>Administrador</option>
                            </select>

                            {
                                errors.role && touched.role &&
                                (
                                    <div className='alert alert-warning'>
                                        <ErrorMessage name='role'></ErrorMessage>
                                    </div>
                                )
                            }

                            <button type="submit">
                                Registrarse
                            </button>
                            {isSubmitting ? <p>Enviando las credenciales...</p> : null}
                        </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterFormik