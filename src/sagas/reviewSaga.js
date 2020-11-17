import {all, put, takeLatest} from "@redux-saga/core/effects"
import * as types from "../actions/types"
import axios from "axios"


function* getReview() {
    try {
        const reviewResponse = yield axios.get("http://localhost:5000/api/review").then(res => res.data);
        yield put({type: types.REVIEW_RECEIVED, payload: reviewResponse});
    } catch(error) {
        yield put({type:types.REVIEW_FAILED, error})
    }
}

function* addReview(action) {
    const {data} = action;
    // const fm = new FormData();
    // fm.append('text', data.text);
    // fm.append('restaurantId', data.restaurantId);
    try {
        const reviewAdd = yield axios.post("http://localhost:5000/api/review", data).then(res => res.data);
        yield put({type: types.REVIEW_ADDED, payload: reviewAdd});
        yield getReview();

    } catch(error) {
        yield put({type:types.REVIEW_FAILED, error})
    }
}

function* deleteReview(action) {
    const {data} = action;
    try {
        const restaurantResponse = yield axios.delete(`http://localhost:5000/api/review/${data}`).then(res => res.data);
        yield put({type: types.DELETE_REVIEW_SUCCESS, payload: restaurantResponse});
        yield getReview();
    } catch(error) {
        yield put({type:types.REVIEW_FAILED, error})
    }
}


export function* reviewSaga() {
    yield all ([
        yield takeLatest(types.GET_REVIEW, getReview),
        yield takeLatest(types.ADD_REVIEW, addReview),
        yield takeLatest(types.DELETE_REVIEW, deleteReview),
    ])
}