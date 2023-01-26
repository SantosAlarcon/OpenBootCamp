import React from 'react'
import Tarea from '../models/claseTarea'
import { PRIORIDAD } from '../models/enumPrioridad'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Alert, AlertTitle } from '@mui/material'

const FormTareas = () => {
    const valoresIniciales = {
        nombre: "",
        descripcion: "",
        prioridad: PRIORIDAD.NORMAL,
        completada: false
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required("Es OBLIGATORIO poner un nombre.")
            .min(6, "El nombre debe tener más de 6 letras"),
        descripcion: Yup.string()
            .required("Es OBLIGATORIO poner una descripción.")
            .min(6, "La descripción debe tener más de 6 letras"),
        prioridad: Yup.string().oneOf([PRIORIDAD.NORMAL, PRIORIDAD.URGENTE])
            .required("Debes escoger una prioridad"),
    });

    return (
        <div>
            <h1>Formulario de tareas</h1>

            <Formik
                initialValues={valoresIniciales}
                validationSchema={validationSchema}

                onSubmit={async (valores, actions) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    const nuevaTarea = new Tarea(valores.nombre, valores.descripcion, valores.prioridad, false);

                    <Alert severity="success">
                        <AlertTitle>Tarea creada con éxito</AlertTitle>
                            This is a success alert — <strong>check it out!</strong>
                    </Alert>

                    console.table(nuevaTarea);

                    /* Se borran los datos del formulario. */
                    actions.resetForm();
            }}>

            {({ isSubmitting, errors, touched }) => (
                <Form className='d-flex gap-4 flex-column py-4'>
                    <label htmlFor="nombre">Nombre: </label>
                    <Field className="form-control" type="text" name="nombre" placeholder="Nombre de la tarea" />
                    {errors.nombre && touched.nombre ? (
                        <div className='alert alert-warning' role="alert">
                            <ErrorMessage name="nombre"></ErrorMessage>
                        </div>
                    ) : null}

                    <label htmlFor="descripcion">Descripción: </label>
                    <Field className="form-control" type="text" name="descripcion" placeholder="Descripción de la tarea" />
                    {errors.descripcion && touched.descripcion ? (
                        <div className='alert alert-warning' role="alert">
                        <ErrorMessage name="descripcion"></ErrorMessage>
                        </div>
                    ) : null}

                    <label htmlFor="prioridad">Prioridad: </label>
                    <Field className="form-select" name="prioridad" as="select">
                        <option value={PRIORIDAD.NORMAL}>Normal</option>
                        <option value={PRIORIDAD.URGENTE}>Urgente</option>
                    </Field>

                    <button className='btn btn-primary' type="submit">Crear tarea</button>
                    {isSubmitting ? <p>Creando la tarea...</p> : null}
                </Form>
            )}

            </Formik>
        </div>
    )
}

export default FormTareas