import { combineReducers } from "redux";
import {taskRootReducer} from "./taskReducer.js";
import authReducer from "./authReducer";
import {deskReducer} from "./deskReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    taskReducer : taskRootReducer,
    desk: deskReducer
})

export default rootReducer
