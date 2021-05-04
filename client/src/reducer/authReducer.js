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

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    userId: null,
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
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
            }
        case AUTH_ERROR:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access)
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