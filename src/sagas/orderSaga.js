import {all, put, takeLatest} from "@redux-saga/core/effects"
import axios from "axios"
import * as types from "../actions/types"


function* addOrder(action) {
    const {data} = action;
    try {
        const orderResponse = yield axios.post("http://localhost:5000/api/order", data).then(res => res.data);
        yield put({type: types.ORDER_ADDED, payload: orderResponse});
        yield getOrder();

    } catch(error) {
        yield put({type:types.ORDER_ADD_FAILED, error})
    }
}

function* getOrder() {
    try {
        const orderResponse = yield axios.get("http://localhost:5000/api/order?=").then(res => res.data);
        yield put({type: types.ORDER_RECEIVED, payload: orderResponse});

    } catch(error) {
        yield put({type:types.ORDER_RECEIVED_FAILED, error})
    }
}





export function* orderSaga() {
    yield all ([
        yield takeLatest(types.ADD_ORDER, addOrder),
        yield takeLatest(types.GET_ORDER, getOrder)
    ])
}
