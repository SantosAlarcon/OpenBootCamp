import axios from 'axios'
import {takeLatest, call, put } from 'redux-saga/effects'
import { API_CALL_REQUEST } from '../actions/asyncActions'

export function* watcherSaga() {
    yield takeLatest(API_CALL_REQUEST, workerSaga);
}

export function* workerSaga(action) {
    try {
        const response = yield call(fetchHttp(action.payload.request));
        const token = response.data.token;

        yield put({
            type: action.payload.okAction,
            payload: {
                token: token
            }
        });
    } catch (error) {
        yield put({
            type: action.payload.failAction,
            payload: {
                error: error
            }
        });
    }
}

function fetchHttp(request) {
    return function() {
        return(axios(request));
    }
}