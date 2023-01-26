import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Formato de correo no válido').required("El email es OBLIGATORIO"),
        password: Yup.string().required("La contraseña es OBLIGATORIA")
    }
)

const LoginFormik = () => {
    const valoresIniciales = {
        email: "",
        password: ""
    }

    return (
        <div>
            <h4>Inicio de sesión</h4>
            <Formik
                // Se establecen los valores por defecto
                initialValues={valoresIniciales}

                // Se establece las reglas de validaación
                validationSchema={loginSchema}

                // Se configura el evento del onSubmit.
                onSubmit={async (valores) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    alert(JSON.stringify(valores, null, 2));
                    localStorage.setItem("credentials", valores);
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

                            <button type="submit">
                                Iniciar sesión
                            </button>
                            {isSubmitting ? <p>Iniciando sesión...</p> : null}
                        </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginFormik