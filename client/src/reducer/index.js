import { combineReducers } from "redux";
import {opRootReducer} from "./opReducer.js";
import authReducer from "./authReducer";
import {deskReducer} from "./deskReducer";
import alertReducer from "./alertReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    opReducer : opRootReducer,
    desk: deskReducer,
    alert: alertReducer,

})

export default rootReducer
