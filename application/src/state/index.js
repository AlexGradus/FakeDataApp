import {combineReducers, legacy_createStore as createStore} from "redux";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
app:appReducer
})

export const store = createStore(rootReducer);