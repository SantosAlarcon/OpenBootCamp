import React, { useState } from 'react'
import '../src/styles/App.css'
import logo from './assets/react.svg'
import PropTypes from 'prop-types'

const Saludo = (props) => {
	// Breve introducción a useState
	const [edad, estEdad] = useState(36);

	const cumplirAnyos = () => {
		estEdad(edad + 1);
	}

	return (
		<div class="App">
			<img src={logo} className='App-logo' alt='logo' />
			<div>
				<h1>Bienvenid@ a React, {props.nombre}!!!</h1>
				<h2>Tienes {edad} años</h2>
				Vamos a empezar a picar código, coño!!!
			</div>
			<div>
				<button onClick={cumplirAnyos}>Cumplir años
				</button>
			</div>
		</div>
	)
}

export default Saludo;

Saludo.propTypes = {
	nombre: PropTypes.string
};