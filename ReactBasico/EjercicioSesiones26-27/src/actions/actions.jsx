// Definimos las constantes
export const CREATE_TASK = 'CREATE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';
export const SHOW_PENDING = 'SHOW_PENDING';

// Definimos las diferentes acciones
export const createTask = (nombre) => {
    return {
        type: CREATE_TASK,
        payload: {
            id,
            nombre,
            completada
        }
    }
}

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        payload: {
            id
        }
    }
}

// Definimos las diferentes acciones
export const toggleTask = (id) => {
    return {
        type: TOGGLE_TASK,
        payload: {
            id
        }
    }
}

export const showAll = (filter) => {
    return {
        type: SHOW_ALL,
        payload: {
            filter
        }
    }
}

export const showCompleted = (filter) => {
    return {
        type: SHOW_COMPLETED,
        payload: {
            filter
        }
    }
}

export const showPending = (filter) => {
    return {
        type: SHOW_PENDING,
        payload: {
            filter
        }
    }
}