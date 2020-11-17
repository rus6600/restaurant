import * as types from "./types";

export function getReview() {
    return {type: types.GET_REVIEW }
}
export function addReview(data) {
    return {type: types.ADD_REVIEW, data}
}
export function deleteReview(data) {
    return {type: types.DELETE_REVIEW, data}
}
