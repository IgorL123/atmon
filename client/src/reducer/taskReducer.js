import {

    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_SUCCESS,
    GET_TASKS_FAIL,
    GET_TASKS_SUCCESS,
    SET_COMPLETE_FAIL,
    SET_COMPLETE_SUCCESS,

} from "../actions/types"

const appState = {
    tasks: [],
    isLoading: false,
}

export const taskRootReducer = (state = appState, action) => {

    switch(action.type){
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: action.tasks.data
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: (state.tasks).concat([action.newTask.data.task])
            }
        case DELETE_TASK_SUCCESS:
            return{
                ...state,
                isLoading: false,
                tasks : (state.tasks).filter(task => task._id !== action.deletedTask.data._id)
        }
        case SET_COMPLETE_SUCCESS:
            let id = action.completedTask.data._id
            let upTasks = (state.tasks).filter(task => task._id !== id )
            upTasks = upTasks.concat([action.completedTask.data])
            return {
                ...state,
                tasks: upTasks
            }
        case DELETE_TASK_FAIL:
        case CREATE_TASK_FAIL:
        case GET_TASKS_FAIL:
        case SET_COMPLETE_FAIL:
        default:
            return state
    }
}