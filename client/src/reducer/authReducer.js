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
    token: Cookies.get('token'),
    isAuthenticated: null,
    isSuperUser: Cookies.set(false),
    isLoading: false,
    userId: Cookies.get('userID'),
    time: Cookies.set(new Date())
}

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
                error: payload.data
            }
        case LOGOUT_SUCCESS:
            Cookies.remove('token');
            Cookies.remove('userID');
            Cookies.remove('superuser')
            Cookies.remove('time')
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
            }
        case AUTH_ERROR:
        case LOGIN_SUCCESS:
            Cookies.set('token', payload.data.token, { expires: 1, path: ''});
            Cookies.set('userID', payload.data.userID, { expires: 1, path: ''});
            Cookies.set('superuser', payload.data.superuser, {expires: 1, path: ''});
            Cookies.set('time', new Date(), {expires: 1, path: ''})
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                isSuperUser: payload.data.superuser,
                token: payload.data.token,
                userId: payload.data.userID,
                time: new Date()
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload.data
            }
        default:
            return state;
    }
}