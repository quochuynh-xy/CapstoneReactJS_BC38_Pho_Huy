import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import booking from "../features/Booking/bookingSlice"; // Booking reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    booking
}); // root reducer
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export default store
