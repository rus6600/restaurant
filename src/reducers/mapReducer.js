import * as types from "../actions/types";

const initialState = {
    isLoading: false,
    coordinates: [],
    coordinatesResponse: ""
}

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_COORDINATES:
            return {...state, isLoading: true}
        case types.COORDINATES_RECEIVED:
            return {...state, isLoading: false, coordinates: action.payload.response.GeoObjectCollection?.featureMember[0].GeoObject.Point.pos.split(" ").map(parseFloat)}
        case types.COORDINATES_FAILED:
            return {...state, isLoading: false, error:action.error};
        default:
            return state;
    }
}



