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
            const found = state.ops.find(op => op.id === action.blockedOp)
            found.blocked = !found.blocked
            return{
                ...state,
                isLoading: false,
                ops: [found].concat(state.ops.filter(op => op.id !== action.blockedOp))

        }
        case GET_OPS_FAIL:
        case BLOCK_OPS_FAIL:
        default:
            return state
    }
}