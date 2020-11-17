import * as types from "./types";

export function signUp(data) {
    return {type: types.SIGN_UP, data}
}

export function signIn(data, history) {
    return {type: types.SIGN_IN, data, history}
}

export function signOut(data, history) {
    return {type: types.SIGN_OUT, data, history}
}

