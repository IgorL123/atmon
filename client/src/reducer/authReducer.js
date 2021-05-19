import {

    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,

} from "../actions/types";
import Cookies from "js-cookie";

const initialState = {
    // token: localStorage.getItem('token'),
    token: Cookies.get('token'),
    isAuthenticated: null,
    isLoading: false,
    userId: Cookies.get('userID'),
}

console.log('bb', initialState.userId);

export default function authReducer(state = initialState, action) {
    const {type, payload} = action
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        case LOGOUT_SUCCESS:
            // localStorage.removeItem('token')
            Cookies.remove('token');
            Cookies.remove('userID');
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
            }
        case AUTH_ERROR:
        case LOGIN_SUCCESS:
            // localStorage.setItem('token', payload.data.token)
            Cookies.set('token', payload.data.token, { expires: 1, path: ''});
            Cookies.set('userID', payload.data.userID, { expires: 1, path: ''});
            // const data =  JSON.stringify(localStorage.getItem('token'))
            // const token = Cookies.get('token');
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: payload.data.token,
                userId: payload.data.userID
            }
        case LOGIN_FAIL:
        default:
            return state;
    }
}