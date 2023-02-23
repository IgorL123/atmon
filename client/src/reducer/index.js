import { combineReducers } from "redux";
import {opRootReducer} from "./opReducer.js";
import authReducer from "./authReducer";
import {tableReducer} from "./tableReducer";
import alertReducer from "./alertReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    opReducer : opRootReducer,
    table: tableReducer,
    alert: alertReducer,

})

export default rootReducer
