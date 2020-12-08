import {all, put, takeLatest} from "@redux-saga/core/effects"
import axios from "axios"
import * as types from "../actions/types"


function* getFavorites() {
    try {
        const favResponse = yield axios.get(`http://localhost:5000/api/favorite/?=`).then(res => res.data);
        yield put({type: types.FAVORITE_RECEIVED, payload:favResponse});
    } catch(error) {
        yield put({type: types.GET_FAVORITE_FAILED, error})
    }
}


function* addFavorite(action) {
    const {data} = action;
    try {
        const favResponse = yield axios.post("http://localhost:5000/api/favorite", data).then(res => res.data);
        yield put({type: types.ADD_FAVORITE_SUCCESS, payload:favResponse});
        getFavorites()
    } catch(error) {
        yield put({type: types.ADD_FAVORITE_FAILED, error})
    }
}






export function* favSaga() {
    yield all ([
        yield takeLatest(types.GET_FAVORITE, getFavorites),
        yield takeLatest(types.ADD_FAVORITE, addFavorite)

    ])
}
