import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
} from "./types"
import axios from "axios";


export const signup = (form) =>  async dispatch => {
    try {
        const data = await axios.post("/api/auth/register", form)
        dispatch(login(form))
    } catch (e) {
        console.log(e)
    }
}

export const login = (form) =>  async dispatch => {
    try {

        const data = await axios.post("/api/auth/login", form)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (e) {
        console.log(e)
        dispatch({
            type: LOGIN_FAIL,

        })
    }
}

export const logout = () =>  async dispatch => {
    try {
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (e) { console.log(e)}
}
