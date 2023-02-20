import {

    BLOCK_OPS_FAIL,
    BLOCK_OPS_SUCCESS,
    GET_OPS_FAIL,
    GET_OPS_SUCCESS,

} from "../actions/types"

const appState = {
    ops: [],
    isLoading: false,
}

export const opRootReducer = (state = appState, action) => {

    switch(action.type){
        case GET_OPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ops: action.ops.data
            }
        case BLOCK_OPS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                ops : (state.tasks).filter(task => task._id !== action.blockedOp.data._id)
        }
        case GET_OPS_FAIL:
        case BLOCK_OPS_FAIL:
        default:
            return state
    }
}