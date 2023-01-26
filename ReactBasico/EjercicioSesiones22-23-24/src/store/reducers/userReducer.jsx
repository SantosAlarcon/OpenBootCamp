import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../actions/asyncActions'

const initialState = {
    fetching: false,
    token: null,
    error: null,
    logged: false
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case API_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                token: action.payload.token,
                logged: true
            }
        case API_CALL_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default: return state;
    }
}