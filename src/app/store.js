import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import booking from "../features/Booking/bookingSlice"; // Booking reducer
import admin from "../features/Admin/adminSlice"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    booking,
    admin
}); // root reducer
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export default store
