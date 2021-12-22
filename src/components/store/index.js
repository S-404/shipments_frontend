import {combineReducers, createStore} from "redux";
import {isAuthReducer} from "./authReducer";

const rootReducer = combineReducers({
    auth: isAuthReducer,
})

export const store = createStore(rootReducer)