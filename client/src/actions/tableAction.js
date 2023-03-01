import {
    GET_CLIENTS_FAIL,
    GET_AC_FAIL,
    GET_ATM_FAIL,
    GET_CARDS_FAIL,
    GET_CUR_FAIL,
    GET_ATM_SUCCESS,
    GET_AC_SUCCESS,
    GET_CLIENTS_SUCCESS,
    GET_CUR_SUCCESS,
    GET_CARDS_SUCCESS
} from "./types"
import axios from "axios"

export const fetchClients = () => async (dispatch) => {
    try {
        const data = await axios.get("api/table/getclients", {})
        dispatch({
            type: GET_CLIENTS_SUCCESS,
            clients: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CLIENTS_FAIL })
    }
}
export const fetchCards = () => async (dispatch) => {
    try {
        const data = await axios.get("api/table/getcards", {})
        dispatch({
            type: GET_CARDS_SUCCESS,
            cards: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CARDS_FAIL })
    }
}

export const fetchAccounts = () => async (dispatch) => {
    try {
        const data = await axios.get("api/table/getaccount", {})
        dispatch({
            type: GET_AC_SUCCESS,
            accounts: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_AC_FAIL })
    }
}

export const fetchAtm = () => async (dispatch) => {
    try {
        const data = await axios.get("api/table/getatm", {})
        dispatch({
            type: GET_ATM_SUCCESS,
            atms: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_ATM_FAIL })
    }
}
export const fetchAtmDate = (date1, date2) => async (dispatch) => {
    try {
        const data = await axios.post("api/table/getatmsdata", {date1, date2})
        dispatch({
            type: GET_ATM_SUCCESS,
            atms: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_ATM_FAIL })
    }
}

export const fetchCurDate = (date1, date2) => async (dispatch) => {
    try {
        const data = await axios.post("api/table/getcurrencydata", {date1, date2})
        dispatch({
            type: GET_CUR_SUCCESS,
            currency: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CUR_FAIL })
    }
}

export const fetchCurrency = () => async (dispatch) => {
    try {
        const data = await axios.get("api/table/getcurrency", {})
        dispatch({
            type: GET_CUR_SUCCESS,
            currency: data,
        })
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CUR_FAIL })
    }
}