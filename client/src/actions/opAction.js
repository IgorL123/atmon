import {
    BLOCK_OPS_FAIL,
    BLOCK_OPS_SUCCESS,
    GET_OPS_FAIL,
    GET_OPS_SUCCESS,
} from "./types"
import axios from "axios"

export const fetchOps = (date) => async (dispatch) => {
    try {

        const data = await axios.post("api/op/get", {date})

        dispatch({
            type: GET_OPS_SUCCESS,
            ops: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_OPS_FAIL })
    }
}

export const fetchOpsRange = (date1, date2) => async (dispatch) => {
    try {

        const data = await axios.post("api/op/getrange", {date1, date2})

        dispatch({
            type: GET_OPS_SUCCESS,
            ops: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_OPS_FAIL })
    }
}

export const blockOp = (index) => async (dispatch) => {
    try {
        const res = await axios.post('/api/op/block', {index})
        console.log(res)
        if (res.data === 100){
            dispatch({
                type: BLOCK_OPS_SUCCESS,
                blockedOp: index
            })
        } else {
            dispatch({
                type: BLOCK_OPS_FAIL,
                payload: res.data
            })
        }
    } catch (e) {
        console.log(e)
        dispatch({type: BLOCK_OPS_FAIL, payload: e.message})
    }
}
