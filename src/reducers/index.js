import {combineReducers} from "redux";
import auth from "./authReducer"
import kitchen from "./kitchenReducer";
import restaurant from "./restaurantReducer"
import review from "./reviewReducer"
import order from "./orderReducer"
import map from "./mapReducer"
import fav from "./favReducer"

export default combineReducers({
    auth,kitchen,restaurant,review,order,map, fav
})
