import * as types from "../actions/types";

const initialState = {
    isLoading: false,
    order: [],
    orderResponse: ""
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ORDER:
            return {...state, isLoading: true}
        case types.ORDER_RECEIVED:
            return {...state, isLoading: false, order: action.payload}
        case types.ORDER_RECEIVED_FAILED:
            return {...state, isLoading: false, error:action.error};
        case types.ADD_ORDER:
            return {...state, isLoading: true, error: action.error};
        case types.ORDER_ADDED:
            return {...state, isLoading: false, orderResponse: action.payload, error: action.error};
        case types.ORDER_ADD_FAILED:
            return  {...state, isLoading: false, error: action.error};


        default:
            return state;
    }
}



