import {all, put, takeLatest} from "@redux-saga/core/effects"
import * as types from "../actions/types"
import axios from "axios"
import {GET_KITCHENS} from "../actions/types";
import {ADD_KITCHENS} from "../actions/types";


function* getKitchens() {
    try {
        const kitchenResponse = yield axios.get("http://localhost:5000/api/kitchen").then(res => res.data);
        yield put({type: types.KITCHENS_RECEIVED, payload: kitchenResponse});

    } catch(error) {
        yield put({type:types.KITCHENS_FAILED, error})
    }
}

function* addKitchens(action) {
    const {data} = action;
    try {
        const kitchenAdd = yield axios.post("http://localhost:5000/api/kitchen", data).then(res => res.data);
        yield put({type: types.KITCHENS_ADDED, payload: kitchenAdd});
        yield getKitchens();

    } catch(error) {
        yield put({type:types.KITCHENS_FAILED, error})
    }
}

function* editKitchen(action) {
    const {data} = action;
    try {
        const kitchenAdd = yield axios.put(`http://localhost:5000/api/kitchen/${data.id}`, {name: data.name}).then(res => res.data);
        yield put({type: types.KITCHEN_EDIT_SUCCESS, payload: kitchenAdd});
        yield getKitchens();
    } catch(error) {
        yield put({type:types.KITCHENS_FAILED, error})
    }
}


function* deleteKitchens(action) {
    const {data} = action;
    console.log(data)
    try {
        const kitchenAdd = yield axios.delete(`http://localhost:5000/api/kitchen/${data}`).then(res => res.data);
        yield put({type: types.DELETE_KITCHENS_SUCCESS, payload: kitchenAdd});
        yield getKitchens();
    } catch(error) {
        yield put({type:types.KITCHENS_FAILED, error})
    }
}



export function* kitchenSaga() {
    yield all ([
        yield takeLatest(types.GET_KITCHENS, getKitchens),
        yield takeLatest(types.ADD_KITCHENS, addKitchens),
        yield takeLatest(types.DELETE_KITCHENS, deleteKitchens),
        yield takeLatest(types.EDIT_KITCHEN, editKitchen),

    ])
}
