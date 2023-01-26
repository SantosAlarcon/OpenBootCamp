import { PropTypes } from 'prop-types';
import React, { useRef } from 'react'
import Tarea from '../../../models/claseTarea';
import { NIVELES } from '../../../models/nivel_enum';

const FormularioTareas = ({ add }) => {
	const nombreRef = useRef('nombre');
	const descRef = useRef('desc');
	const nivelRef = useRef("nivel");

	function crearTarea(e) {
		console.log("Creando tarea...");
		e.preventDefault();

		const nuevaTarea = new Tarea(
			nombreRef.current.value,
			descRef.current.value,
			false,
			nivelRef.current.value
		)
		console.table(nuevaTarea);
		add(nuevaTarea);

		// Después de añadir la tarea, los campos se restablecen.
		nombreRef.current.value = "";
		descRef.current.value = "";
		nivelRef.current.value = "normal";
	}

	return (
		<div>
			<hr />
			<form id="formTareas" className='d-flex flex-column gap-3 justify-content-center align-items-center mb-4' onSubmit={crearTarea}>
				<label htmlFor="nombre" id="nombre">Nombre de la tarea: </label>
				<input type="text" className='form-control form-control-lg' required autoFocus ref={nombreRef} id="nombre" placeholder='Introduce el nombre de la tarea'></input>
				<label htmlFor="desc" id="desc">Descripción de la tarea: </label>
				<input type="text" className='form-control form-control-lg' required ref={descRef} id="desc" placeholder='Introduce la descripción de la tarea'></input>
				<label htmlFor="nivel" id="nivel" className='sr-only'>Nivel de la alerta: </label>
				<select className='form-select form-select-lg' id="nivel" ref={nivelRef} defaultValue={NIVELES.NORMAL}>
					<option value={NIVELES.NORMAL}>Normal</option>
					<option value={NIVELES.URGENTE}>Urgente</option>
					<option value={NIVELES.BLOQUEANDO}>Bloqueando</option>
				</select>
				<button type="submit" className='btn btn-success btn-lg ms-2'>Crear tarea</button>
			</form>
		</div>
	)
}

FormularioTareas.protoTypes = {
	add: PropTypes.func.isRequired
}

export default FormularioTareas;