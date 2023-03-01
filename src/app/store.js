import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bookingReducer from "../features/Booking/bookingSlice"; // Booking reducer
import authenReducer from "../features/Authentication/authenSlice";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    booking: bookingReducer,
    auth: authenReducer
}); // root reducer
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export default store
