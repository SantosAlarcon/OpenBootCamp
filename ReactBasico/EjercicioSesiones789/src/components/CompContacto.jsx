import React from 'react'
import PropTypes from 'prop-types'
import Contacto from '../models/claseContacto'
import icono from '../assets/Google_Contacts_icon.svg'

const CompContacto = ({ contacto, conectado, borrar }) => {
	return (
		<div className='w-[75%] grid grid-cols-[70px_1fr_1fr] grid-rows-2 gap-5 bg-cyan-500 rounded-3xl p-3 mb-7 items-center mx-auto hover:scale-110 transition-all transform-gpu'>
			<div className='row-span-2'>
				<img className='w-[5rem]' src={icono} />
			</div>
			<div>
				<h2 className='text-left font-black text-2xl'>{contacto.nombre} {contacto.apellidos}</h2>
			</div>
			<div className='justify-self-end'>
				<h3 className='bg-blue-800 py-1 px-2 rounded-3xl'>{contacto.email}</h3>
			</div>
			<div className='items-center'>
				<h3 className='text-2xl text-left font-bold'>{contacto.telefono}</h3>
			</div>
			<div className='justify-self-end'>
				{contacto.conectado ? <span onClick={() => conectado(contacto)} className='bg-blue-800 p-3 rounded-full text-xs cursor-pointer select-none'>Conectado</span> : <span onClick={() => conectado(contacto)} className='bg-red-800 p-3 rounded-full text-xs cursor-pointer select-none'>Desconectado</span>}
				<button onClick={() => borrar(contacto)} className='bg-red-800 p-3 rounded-full text-xs ml-3'>Borrar</button>
			</div>
		</div>
	)
}

CompContacto.propTypes = {
	contacto: PropTypes.instanceOf(Contacto).isRequired,
	conectado: PropTypes.func.isRequired,
	borrar: PropTypes.func.isRequired
}

export default CompContacto