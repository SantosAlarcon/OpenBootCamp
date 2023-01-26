import { createContext, Provider, useReducer, useRef, useState } from 'react'
import { CREATE_TASK, DELETE_TASK, TOGGLE_TASK, SHOW_ALL, SHOW_PENDING, SHOW_COMPLETED } from './actions/actions'
import './App.css'

export const App = () => {

	const textRef = useRef("");

	const [todoId, setTodoId] = useState(3);

	const tareasIniciales = [
		{
			id: 0,
			nombre: "Actualizar el repositorio de ejercicios de React",
			completada: false
		},
		{
			id: 1,
			nombre: "Descargar más canciones de música remember",
			completada: false
		},
		{
			id: 2,
			nombre: "Actualizar los paquetes de Debian",
			completada: true
		}
	]

	const FilterContext = createContext(SHOW_ALL);

	// Reducers
	const TaskReducer = (tareas, action) => {
		switch (action.type) {
			case CREATE_TASK:
				setTodoId(todoId + 1);
				return [
					...tareas,
					{
						id: todoId,
						nombre: action.payload.nombre,
						completada: false
					}
				];
			case DELETE_TASK:
				return tareas.filter(tarea => tarea.id !== action.payload.id);
			case TOGGLE_TASK:
				return tareas.map(tarea => {
					if (tarea.id === action.payload.id) {
						return { ...tarea, completada: !tarea.completada };
					}
					return tarea;
				});

			default: return tareas;
		}
	}

	const FilterReducer = (filter, action) => {
		switch (action.type) {
			case SHOW_ALL:
				return filter = SHOW_ALL;
			case SHOW_PENDING:
				return filter = SHOW_PENDING;
			case SHOW_COMPLETED:
				return filter = SHOW_COMPLETED;
			default: return filter = estado;
		}
	}

	const [estado, dispatch] = useReducer(TaskReducer, tareasIniciales);
	const [filter, dispatchF] = useReducer(FilterReducer, SHOW_ALL);

	// Función para crear tarea
	const createTask = (e) => {
		e.preventDefault();
		dispatch({ type: CREATE_TASK, payload: { nombre: textRef.current.value } })
		textRef.current.value = "";
	}

	//Componente para renderizar la lista de tareas
	const TaskList = () => {
		return estado
		.filter(tarea => {
			switch(filter) {
				case SHOW_ALL:
					return estado;
				case SHOW_COMPLETED:
					return tarea.completada
				case SHOW_PENDING:
					return !tarea.completada
			}
		})
		.map(tarea => (
				<li key={tarea.id} className='task'>
					<span className={tarea.completada ? "tarea-comp" : "tarea-pend"}>{`${tarea.id} - ${tarea.nombre}`}</span>
					<button onClick={() => dispatch({ type: TOGGLE_TASK, payload: { id: tarea.id } })}>Conmutar</button>
					<button onClick={() => dispatch({ type: DELETE_TASK, payload: { id: tarea.id } })}>Borrar</button>
				</li>
		))};

	return (
		<>
			<form className='task-form' onSubmit={createTask}>
				<input type="text" ref={textRef} placeholder="Introduce el nombre de la tarea" required />
				<button type="submit">Crear tarea</button>
			</form>
			<hr />
			<div className='filters'>
				<button onClick={() => dispatchF({ type: SHOW_ALL })}>Mostrar todas</button>
				<button onClick={() => dispatchF({ type: SHOW_COMPLETED })}>Mostrar completadas</button>
				<button onClick={() => dispatchF({ type: SHOW_PENDING })}>Mostrar pendientes</button>
			</div>
			<hr />
			<h1>Tu lista de tareas</h1>
			<FilterContext.Provider value={filter}>
				{estado.length > 0
					?
					<ul className="tasklist">
						<TaskList />
					</ul>
					: <h2>No hay tareas pendientes 👍👍👍</h2>}
			</FilterContext.Provider>
		</>
	)
}

export default App
