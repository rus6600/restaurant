import * as types from "./types";

export function getKitchens() {
    return {type: types.GET_KITCHENS }
}
export function addKitchen(data) {
    return {type: types.ADD_KITCHENS, data}
}
export function deleteKitchens(data) {
    return {type: types.DELETE_KITCHENS, data}
}

export function editKitchen(data) {
    return {type: types.EDIT_KITCHEN, data}
}