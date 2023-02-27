import { combineReducers } from "redux";
import {opRootReducer} from "./opReducer.js";
import authReducer from "./authReducer";
import {tableReducer} from "./tableReducer";
import alertReducer from "./alertReducer";
import {userReducer} from "./userReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    opReducer : opRootReducer,
    table: tableReducer,
    alert: alertReducer,
    user: userReducer,

})

export default rootReducer
