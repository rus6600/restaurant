import * as types from "../actions/types";

const initialState = {
    isLoading: false,
    review: [],
    reviewResponse: ""
}

export default function kitchenReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_REVIEW:
            return {...state, isLoading: true}
        case types.REVIEW_RECEIVED:
            return {...state, isLoading: false, reviews: action.payload}
        case types.REVIEW_FAILED:
            return {...state, isLoading: false, error:action.error};
        case types.ADD_REVIEW:
            return {...state, isLoading: true, error: action.error};
        case types.REVIEW_ADDED:
            return {...state, isLoading: false, reviewResponse: action.payload, error: action.error};
        case types.DELETE_REVIEW:
            return  {...state, isLoading: true, reviewResponse: action.payload, error: action.error};
        default:
            return state;
    }
}



