import {

    GET_DESKS_SUCCESS,
    GET_DESKS_FAIL,
    CREATE_DESK_FAIL,
    CREATE_DESK_SUCCESS,
    DELETE_DESK_FAIL,
    DELETE_DESK_SUCCESS, SET_DESK_SUCCESS

} from "../actions/types"

const deskInitState = {currentDesk: "default", desks: []}

export const deskReducer = (state = deskInitState, action) => {
    switch(action.type){
        case GET_DESKS_SUCCESS:
            return {
                ...state,
                desks: action.desks.data,
            }
        case CREATE_DESK_SUCCESS:
            return {
                ...state,
                desks: (state.desks).concat([action.newDesk.data])
            }
        case DELETE_DESK_SUCCESS:
            return {
                ...state,
                desks: action.desks
            }
        case SET_DESK_SUCCESS:
            return {
                ...state,
                currentDesk: action.currentDesk
            }
        case GET_DESKS_FAIL:
        case CREATE_DESK_FAIL:
        case DELETE_DESK_FAIL:
        default:
            return state
    }
}
