import {
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "./types"
import axios from "axios"


export const fetchUsers = () => async (dispatch) => {
    try {
        const data = await axios.get("api/user/getusers", {})
        dispatch({
            type: GET_USERS_SUCCESS,
            users: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_USERS_FAIL })
    }
}

export const addUser = (email, superuser) => async (dispatch) => {
    try {
        await axios.post("api/user/adduser", {email, superuser})
        dispatch({
            type: ADD_USER_SUCCESS,
            newUser: [email, superuser]
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: ADD_USER_FAIL })
    }
}

export const deleteUser = (email) => async (dispatch) => {
    try {

        await axios.post("api/user/deleteuser", {email})
        dispatch({
            type: DELETE_USER_SUCCESS,
            deleteUser: [email],
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: DELETE_USER_FAIL })
    }
}