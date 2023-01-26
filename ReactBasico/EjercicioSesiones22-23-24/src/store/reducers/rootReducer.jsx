import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { todosReducer } from './todosReducer'
import { filterReducer } from './filterReducer'

export const rootReducer = combineReducers({
    userState: userReducer,
    todosState: todosReducer,
    filterState: filterReducer
})