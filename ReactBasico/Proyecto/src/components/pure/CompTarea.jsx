import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tarea from '../../models/claseTarea'
import '../../styles/tarea.scss'
import { NIVELES } from '../../models/nivel_enum'

const CompTarea = ({tarea, completar, borrar}) => {

	const devolverNivel = () => {
		let nivel = "";
		switch (tarea.nivel) {
			case NIVELES.NORMAL:
				nivel = <span className='badge text-bg-primary'>Normal</span>;
				break;
			case NIVELES.URGENTE:
				nivel = <span className='badge text-bg-warning'>Urgente</span>;
				break;
			case NIVELES.BLOQUEANDO:
				nivel = <span className='badge text-bg-danger'>Bloqueando</span>;
				break;
		}

		return nivel;
	}

	return (
		<div className='tarea my-4'>
		<i onClick={() => borrar(tarea)} className="bi bi-x-lg text-end tarea-remove text-danger"></i>
			<h2 className='tarea-nombre fs-1 py-3 fw-bold'>{tarea.nombre}</h2>
			<h3 className='tarea-desc fs-5'>{tarea.descripcion}</h3>
			<h4 className='tarea-nivel'>{devolverNivel()}</h4>
			<h5 onClick={() => completar(tarea)} className='text-end tarea-completada user-select-none pe-auto tarea-pointer'>{tarea.completada ? <span className='badge text-bg-success'>COMPLETADA</span> : <span className='badge text-bg-primary'>PENDIENTE</span>}
			</h5>
		</div>
	)
}

CompTarea.propTypes = {
	tarea: PropTypes.instanceOf(Tarea).isRequired,
	completar: PropTypes.func.isRequired,
	borrar: PropTypes.func.isRequired
}

export default CompTarea
