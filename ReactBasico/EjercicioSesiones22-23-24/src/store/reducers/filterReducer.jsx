import {SET_VISIBILITY_FILTER} from '../actions/actions'

const initialState = 'SHOW_ALL'

export const filterReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.payload.filter;
        default: return state;
    }
}