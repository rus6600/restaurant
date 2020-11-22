import {all, put, takeLatest} from "@redux-saga/core/effects"
import * as types from "../actions/types"
import axios from "axios"
import setAuthToken from "../utils/setAuthToken";
import setRole from "../utils/setRole";
import jwt_decode from "jwt-decode"

function* signUp(action) {
    const {data} = action;
    try {
        const authResponse = yield axios.post("http://localhost:5000/api/users/register", data).then(res => res.data);
        yield put({type: types.SIGN_SUCCESS, payload: authResponse});

    } catch(error) {
        yield put({type:types.SIGN_UP_FAILED, error})
    }
}

function* signIn(action) {
    const {data} = action;
    try {
        const authResponse = yield axios.post("http://localhost:5000/api/users/login", data).then(res => res.data)
        const {token, role} = authResponse;
        setAuthToken(token)
        setRole(role)
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        const decoded = jwt_decode(token);
        const userRole = role
        yield put({type: types.SET_CURRENT_USER, payload: decoded, userRole})
        // if (role === "admin")
        //     {history.push("/dashboard/restaurant")}
        // else history.push("/user")
    } catch(error) {
        yield put({type: types.SIGN_IN_FAILED, error})
    }
}

function* signOut(action) {
    const {history} = action;
    try {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        yield put({type: types.SET_CURRENT_USER_SIGN_OUT, payload: {}});
            setAuthToken(false);
            setRole(false);
            // window.location.href = "/signin";
    } catch(error) {
        yield put({type: types.SIGN_OUT_FAILED, error})
    }
}



export function* authSaga() {
    yield all ([
        yield takeLatest(types.SIGN_UP, signUp),
        yield takeLatest(types.SIGN_IN, signIn),
        yield takeLatest(types.SIGN_OUT, signOut)
    ])
}
