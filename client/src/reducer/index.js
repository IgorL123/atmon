import { combineReducers } from "redux";
import {taskRootReducer} from "./taskReducer.js";
import authReducer from "./authReducer";
import {deskReducer} from "./deskReducer";
import alertReducer from "./alertReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    taskReducer : taskRootReducer,
    desk: deskReducer,
    alert: alertReducer,

})

export default rootReducer
