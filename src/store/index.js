import {combineReducers, createStore} from "redux";
import {isAuthReducer} from "./authReducer";
import {userReducer} from "./userReducer";
import {accessReducer} from "./accessReducer";

const rootReducer = combineReducers({
    auth: isAuthReducer,
    user: userReducer,
    access: accessReducer,
})

export const store = createStore(rootReducer)