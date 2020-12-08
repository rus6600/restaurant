import * as types from "../actions/types";

const initialState = {
    isLoading: false,
    favorites: [],
    favoriteResponse: ""
}

export default function favReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_FAVORITE:
            return {...state, isLoading: true}
        case types.FAVORITE_RECEIVED:
            return {...state, isLoading: false, favorites: action.payload}
        case types.GET_FAVORITE_FAILED:
            return {...state, isLoading: false, error:action.error};
        case types.ADD_FAVORITE:
            return {...state, isLoading: true, error: action.error};
        case types.ADD_FAVORITE_SUCCESS:
            return {...state, isLoading: false, favoriteResponse: action.payload, error: action.error};
        default:
            return state;
    }
}



