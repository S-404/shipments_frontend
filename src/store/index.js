import {combineReducers, createStore} from "redux";
import {isAuthReducer} from "./authReducer";
import {userReducer} from "./userReducer";
import {accessReducer} from "./accessReducer";
import {deferredReducer} from "./deferredReducer";

const rootReducer = combineReducers({
    auth: isAuthReducer,
    user: userReducer,
    access: accessReducer,
    deferred: deferredReducer,
})

export const store = createStore(rootReducer)