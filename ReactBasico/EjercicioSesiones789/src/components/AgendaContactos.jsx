import React, { useState } from 'react'
import Contacto from '../models/claseContacto'
import CompContacto from './CompContacto';
import FormularioContacto from './FormularioContacto';

const AgendaContactos = () => {
	const cont1 = new Contacto("Ceferino", "Montalbán", "664222555", "cefmontalban@gmail.com", true);
	const cont2 = new Contacto("Haato", "Akai", "123456789", "akaihaato@gmail.com", true);
	const cont3 = new Contacto("Miyuri", "Miyako", "667865553", "miyakomiyuri@gmail.com", false);
	const listaContactos = [cont1, cont2, cont3]

	const [contactos, setContactos] = useState(listaContactos);

	function borrarContacto(contacto) {
		const tempContactos = [...contactos];
		const indice = contactos.indexOf(contacto);
		tempContactos.splice(indice, 1);
		setContactos(tempContactos);
	}

	function crearContacto(contacto) {
		const tempContactos = [...contactos];
		tempContactos.push(contacto);
		setContactos(tempContactos);
	}

	function cambiarConectado(contacto) {
		const tempContactos = [...contactos];
		const indice = contactos.indexOf(contacto);
		tempContactos[indice].conectado ? tempContactos[indice].conectado = false : tempContactos[indice].conectado = true;
		setContactos(tempContactos);
	}

	return (
		<div className="container">
			<h1 className='font-black pb-8'>Agenda de Contactos</h1>
			{ contactos.length > 0 ?
				contactos.map((contacto) =>
					<CompContacto contacto={contacto} conectado={cambiarConectado} borrar={borrarContacto}></CompContacto>
				) : <h1 className='font-bold py-4'>No hay contactos en la agenda 😢</h1>
			}
			<hr />
			<FormularioContacto add={crearContacto}></FormularioContacto>
		</div>
	)
}

export default AgendaContactos