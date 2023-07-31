import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import { register } from '../../services/authService'
import { AxiosResponse } from 'axios'
import "../../styles/AuthForm.css"

// Se define el esquema de validación
const registerSchema = Yup.object().shape({
  name: Yup.string().min(6, "El nombre debe tener al menos 6 letras.").max(12, "El nombre debe tener como máximo 12 letras.").required("El OBLIGATORIO poner el nombre"),
  email: Yup.string().email("Formato de email no válido").required("Es OBLIGATORIO poner el email"),
  password: Yup.string().min(8, "La contraseña debe tener como mínimo 8 letras.").required("Es OBLIGATORIO poner la contraseña"),
  confirm: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      "¡Las contraseñas deben coincidir!"
    ).required("Ambas contraseñas deben coincidir."),
  age: Yup.number().min(18, "Debes tener 18 años o más.").required("Es OBLIGATORIO poner la edad"),
})

const RegisterForm = () => {

  // Se definen los valores iniciales.
  const valoresIniciales = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    age: 18
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
            .then((response: axiosresponse) => {
              if (response.status === 200) {
                alert(json.stringify(response.data.message, null, 2));
              } else {
                throw new error("no se ha podido crear el usuario. comprueba el nombre, email, la contraseña, la edad o que el servidor esté funcionando.")
              }
        })
            .catch((error: any) => console.log(`[error a la hora de crear el usuario]: ${error}`))
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
              <label htmlFor="confirm">Confirmar contraseña</label>
              <Field id="confirm" type="password" name="confirm" placeholder="Confirma la contraseña" />

              {/* Errores de la contraseña */}
              {
                errors.confirm && touched.confirm && (
                  <ErrorMessage name="confirm" componente="div">
                  </ErrorMessage>
                )
              }


              {/* Campo de la edad */}
              <label htmlFor="age">Edad</label>
              <Field id="age" type="number" min="18" max="100" name="age" placeholder="Edad" />

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
