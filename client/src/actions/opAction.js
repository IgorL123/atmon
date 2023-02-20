import {
    BLOCK_OPS_FAIL,
    BLOCK_OPS_SUCCESS,
    GET_OPS_FAIL,
    GET_OPS_SUCCESS,
} from "./types"
import axios from "axios"
import {crypto} from "../cipher/crypto"


export const fetchOps = () => async (dispatch) => {
    try {

        const data = await axios.post("api/op/get")

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
        const blocked = await axios.post('/api/op/block', {index})

        dispatch({
            type: BLOCK_OPS_SUCCESS,
            blockedOp: blocked
        })
    } catch (e) {
        console.log(e)
        dispatch({type: BLOCK_OPS_FAIL, payload: e.message})
    }
}
