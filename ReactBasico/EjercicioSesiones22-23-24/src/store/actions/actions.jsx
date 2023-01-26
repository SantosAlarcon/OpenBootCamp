// Establecemos el ID para las tareas
let nextTodoID = 0

// Tipos de acción
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        payload: {
            // Cuando se crea una tarea, se aumenta el número de ID y se almacena el texto.
            id: nextTodoID ++,
            text
        }
    }
}

export const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        payload: {
            id
        }
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: SET_VISIBILITY_FILTER,
        payload: {
            filter
        }
    }
}

