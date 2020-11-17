import {combineReducers} from "redux";
import auth from "./authReducer"
import kitchen from "./kitchenReducer";
import restaurant from "./restaurantReducer"
import review from "./reviewReducer"

export default combineReducers({
    auth,kitchen,restaurant, review
})
