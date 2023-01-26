import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from "redux"
import {composeWithDevTools} from '@redux-devtools/extension'
import { rootReducer } from '../reducers/rootReducer'
import { watcherSaga } from '../sagas/sagas'

export const createAppStore = () => {
    let store = createStore(rootReducer, composeWithDevTools());
    return store;
}

export const createAsyncAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    let store = createStore(rootReducer, 
        compose(
            applyMiddleware(sagaMiddleware), composeWithDevTools())
        );
    
    sagaMiddleware.run(watcherSaga)

    return store;
}