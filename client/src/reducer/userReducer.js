import {
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "../actions/types"

const usersInitState = {users: []}

export const userReducer = (state = usersInitState, action) => {
    switch(action.type){
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users.data,
            }
        case ADD_USER_SUCCESS:
            let id
            if (state.users.length === 0)  id = 1
            else  id = state.users[state.users.length - 1]["id"] + 1
            const add = {"id": id, "email": action.newUser[0], "superuser":action.newUser[1]}
            return {
                ...state,
                users: (state.users).concat(add)
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users: (state.users).filter(user => user.email !== action.deleteUser[0])
            }
        case GET_USERS_FAIL:
        case ADD_USER_FAIL:
        case DELETE_USER_FAIL:
        default:
            return state
    }
}