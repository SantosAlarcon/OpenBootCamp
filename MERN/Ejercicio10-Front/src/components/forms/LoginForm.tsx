import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import { login } from '../../services/authService'
import { AxiosResponse } from 'axios'

// Se define el esquema de validación
const loginSchema = Yup.object().shape({
    email: Yup.string().email("Formato de email no válido").required("Es OBLIGATORIO poner el email"),
    password: Yup.string().required("Es OBLIGATORIO poner la contraseña")
})

const LoginForm = () => {

    // Se definen las credenciales iniciales.
    const credencialesIniciales = {
        email: "",
        password: ""
    }

    return (
        <div>
            <h4>Iniciar sesión</h4>

            {/* Componente Formik */}
            <Formik
                initialValues={credencialesIniciales}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    await login(values.email, values.password)
                        .then((response: AxiosResponse) => {

                            if (response.status === 200) {
                                if (response.data.token) {
                                    // Se guarda el token en el SessionStorage
                                    sessionStorage.setItem("sessionToken", response.data.token);
                                } else {
                                    throw new Error("Error al generar un nuevo token.")
                                }
                            } else {
                                throw new Error("No se ha podido iniciar sesión. Comprueba el email, la contraseña, o que el servidor esté funcionando.")
                            }
                        })
                        .catch((error: any) => console.log(`[ERROR DE LOGIN]: ${error}`))
                }}
            >
                {
                    ({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                        <Form>
                            {/* Campo del email */}
                            <label htmlFor="email">Correo electrónico</label>
                            <Field id="email" type="email" name="email" placeholder="Correo electrónico" />

                            {/* Errores de email */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name="email" componente="div">
                                    </ErrorMessage>
                                )
                            }

                            {/* Campo de la contraseña */}
                            <label htmlFor="password">Contraseña</label>
                            <Field id="password" type="password" name="password" placeholder="Contraseña" />

                            {/* Errores de la contraseña */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name="password" componente="div">
                                    </ErrorMessage>
                                )
                            }

                            {/* Botón para enviar */}
                            {
                                <button type="submit">Iniciar sesión</button>
                            }

                            {isSubmitting ? <p>Iniciando sesión...</p> : null}
                        </Form>
                    )
                }
            </Formik>
        </div >
    )
}

export default LoginForm
