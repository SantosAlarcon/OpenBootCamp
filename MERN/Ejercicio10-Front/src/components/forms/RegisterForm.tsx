import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import { register } from '../../services/authService'
import { AxiosResponse } from 'axios'
import "../../styles/AuthForm.css"

// Se define el esquema de validación
const registerSchema = Yup.object().shape({
  name: Yup.string().required("El OBLIGATORIO poner el nombre"),
  email: Yup.string().email("Formato de email no válido").required("Es OBLIGATORIO poner el email"),
  password: Yup.string().required("Es OBLIGATORIO poner la contraseña"),
  cpassword: Yup.string()
    .oneOf([Yup.ref('password')], "Ambas contraseñas deben coincidir").required("Ambas contraseñas deben coincidir"),
  age: Yup.number().required("Es OBLIGATORIO poner la edad")
})

const RegisterForm = () => {

  // Se definen los valores iniciales.
  const valoresIniciales = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    age: 0
  }

  return (
    <div>
      <h4>Registrar nuevo usuario</h4>

      {/* Componente Formik */}
      <Formik
        initialValues={valoresIniciales}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          await register(values.name, values.email, values.password, values.age)
            .then((response: AxiosResponse) => {
              if (response.status === 201) {
                alert(JSON.stringify(response.data.message, null, 2));
              } else {
                throw new Error("No se ha podido crear el usuario. Comprueba el nombre, email, la contraseña, la edad o que el servidor esté funcionando.")
              }
            })
            .catch((error: any) => console.log(`[ERROR A LA HORA DE CREAR EL USUARIO]: ${error}`))
        }}
      >
        {
          ({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
            <Form>
              {/* Campo del nombre */}
              <label htmlFor="name">Nombre</label>
              <Field id="name" type="text" name="name" placeholder="Nombre" />

              {/* Errores de nombre */}
              {
                errors.name && touched.name && (
                  <ErrorMessage name="name" componente="div">
                  </ErrorMessage>
                )
              }

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

              {/* Campo de confirmar la contraseña */}
              <label htmlFor="cpassword">Confirmar contraseña</label>
              <Field id="cpassword" type="password" name="cpassword" placeholder="Confirma la contraseña" />

              {/* Errores de la contraseña */}
              {
                errors.cpassword && touched.cpassword && values.password !== values.cpassword && (
                  <ErrorMessage name="cpassword" componente="div">
                  </ErrorMessage>
                )
              }


              {/* Campo de la edad */}
              <label htmlFor="age">Edad</label>
              <Field id="age" type="number" name="age" placeholder="Edad" />

              {/* Errores de la edad */}
              {
                errors.age && touched.age && (
                  <ErrorMessage name="age" componente="div">
                  </ErrorMessage>
                )
              }


              {/* Botón para enviar */}
              {
                <button type="submit">Crear nuevo usuario</button>
              }

              {isSubmitting ? <p>Creando nuevo usuario...</p> : null}
            </Form>
          )
        }
      </Formik>
    </div >
  )
}

export default RegisterForm

