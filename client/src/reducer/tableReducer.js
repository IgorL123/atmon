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
    GET_CARDS_SUCCESS, GET_CHART_SUCCESS, GET_CHART_FAIL, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAIL
} from "../actions/types"
const tablesInitState = {cards:[], currency: [], clients: [], accounts: [], atms: [], chart: []}

export const tableReducer = (state = tablesInitState, action) => {
    switch(action.type){
        case GET_CARDS_SUCCESS:
            return {
                ...state,
                cards: action.cards.data,
            }
        case GET_AC_SUCCESS:
            return {
                ...state,
                accounts: action.accounts.data
            }
        case GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: action.clients.data
            }
        case GET_ATM_SUCCESS:
            return {
                ...state,
                atms: action.atms.data
            }
        case GET_CUR_SUCCESS:
            return {
                ...state,
                currency: action.currency.data
            }
        case GET_CHART_SUCCESS:
            return {
                ...state,
                chart: action.chart.data
            }
        case ADD_CLIENT_SUCCESS:
            const add = {"name": action.newClient[0],"email": action.newClient[1]}
            return {
                ...state,
                clients: state.clients.concat(add)
            }
        case GET_CLIENTS_FAIL:
        case GET_ATM_FAIL:
        case GET_AC_FAIL:
        case GET_CUR_FAIL:
        case GET_CARDS_FAIL:
        case GET_CHART_FAIL:
        case ADD_CLIENT_FAIL:
        default:
            return state
    }
}
