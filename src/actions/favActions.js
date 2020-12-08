import * as types from "./types";

export function getFavorites() {
    return {type: types.GET_FAVORITE }
}
export function addFavorite(data) {
    return {type: types.ADD_FAVORITE, data}
}