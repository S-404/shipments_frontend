import {combineReducers, createStore} from "redux";
import {isAuthReducer} from "./authReducer";
import {userReducer} from "./userReducer";

const rootReducer = combineReducers({
    auth: isAuthReducer,
    user: userReducer,
})

export const store = createStore(rootReducer)