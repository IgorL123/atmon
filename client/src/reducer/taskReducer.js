import {

    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_SUCCESS,
    GET_TASKS_FAIL,
    GET_TASKS_SUCCESS,

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
                tasks : state.tasks

        }
        case DELETE_TASK_FAIL:
        case CREATE_TASK_FAIL:
        case GET_TASKS_FAIL:
        default:
            return state
    }
}