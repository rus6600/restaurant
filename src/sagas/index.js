import {all} from "redux-saga/effects"
import {authSaga} from './authSaga'
import {kitchenSaga} from "./kitchenSaga";
import {restaurantSaga} from "./restaurantSaga"
import {reviewSaga} from "./reviewSaga"
import {orderSaga} from "./orderSaga"
export default function* rootSaga() {
    yield all([
        authSaga(),
        kitchenSaga(),
        restaurantSaga(),
        reviewSaga(),
        orderSaga()
    ])
}