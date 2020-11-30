import {all, put, takeLatest} from "@redux-saga/core/effects"
import axios from "axios"
import * as types from "../actions/types"


function* getCoordinates(action) {
    const {data} = action;
    try {
        const mapResponse = yield axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=2a5ac415-ab23-4259-9f37-d80438ee8fd6&results=1&format=json&geocode=${data}`).then(res => res.data);
        yield put({type: types.COORDINATES_RECEIVED, payload:mapResponse});
    } catch(error) {
        yield put({type:types.COORDINATES_FAILED, error})
    }
}



export function* mapSaga() {
    yield all ([
        yield takeLatest(types.GET_COORDINATES, getCoordinates)
    ])
}
