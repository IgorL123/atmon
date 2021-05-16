import {

    GET_DESKS_SUCCESS,
    GET_DESKS_FAIL,
    CREATE_DESK_FAIL,
    CREATE_DESK_SUCCESS,
    DELETE_DESK_FAIL,
    DELETE_DESK_SUCCESS,
    SET_DESK_SUCCESS,

} from "./types"
import axios from "axios"

export const fetchDesks = (userId) => async (dispatch) => {
    try {
        const data = await axios.post("api/desk/getdesks", {userId})
        dispatch({
            type: GET_DESKS_SUCCESS,
            desks: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_DESKS_FAIL })
    }
}
export const setDesk = (deskInfo) => async(dispatch) => {
    try {
        dispatch({
            type: SET_DESK_SUCCESS,
            currentDesk: deskInfo
        })

    } catch (e) { console.log(e) }
}

export const createDesk = (value, userId) => async (dispatch) => {
    try {
        const created = await axios.post('/api/desk/createdesk',{value, userId})
        dispatch({
            type: CREATE_DESK_SUCCESS,
            newDesk: created
        })
    } catch (e) {
        console.log(e)
        dispatch({type: CREATE_DESK_FAIL, payload: e.message})
    }
}

export const deleteDesk = (index, deskInfo) => async (dispatch) => {
    try {
        const deleted = await axios.post('/api/desk/deletedesk', {index, deskInfo})
        dispatch({
            type: DELETE_DESK_SUCCESS,
            deletedDesk: deleted
        })
    } catch (e) {
        console.log(e)
        dispatch({type: DELETE_DESK_FAIL, payload: e.message})
    }
}