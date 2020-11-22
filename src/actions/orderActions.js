import * as types from "./types"


export function getOrder(data) {
    return {type: types.GET_ORDER, data}

}

export function addOrder(data) {
    return {type: types.ADD_ORDER, data}

}

