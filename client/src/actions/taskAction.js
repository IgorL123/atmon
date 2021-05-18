import {
    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_SUCCESS,
    GET_TASKS_FAIL,
    GET_TASKS_SUCCESS, SET_COMPLETE_FAIL, SET_COMPLETE_SUCCESS,
} from "./types"
import axios from "axios"
import {crypto} from "../cipher/crypto"


export const fetchTask = (deskInfo, userId) => async (dispatch) => {
    try {

        const data = await axios.post("api/link/get", {deskInfo, userId})

        for(let i = 0; i < data.data.length; i++ ){
            data.data[i].text = crypto.decrypt(data.data[i].text)
            data.data[i].date = crypto.decrypt(data.data[i].date)
        }
        dispatch({
            type: GET_TASKS_SUCCESS,
            tasks: data,
        })

    } catch (e) {
        console.log(e)
        dispatch({ type: GET_TASKS_FAIL })
    }
}

export const createTask1 = (value, deskInfo, userId, date) => async (dispatch) => {

    try {

        const eValue = crypto.encrypt(value)
        const eDate = crypto.encrypt(date)

        const created = await axios.post('/api/link/make',{eValue, deskInfo, userId, eDate})
        created.data.task.text = crypto.decrypt(created.data.task.text)
        created.data.task.date = crypto.decrypt(created.data.task.date)

        dispatch({
            type: CREATE_TASK_SUCCESS,
            newTask: created
        })
    } catch (e) {
        console.log(e)
        dispatch({type: CREATE_TASK_FAIL, payload: e.message})
    }
}

export const deleteTask1 = (index) => async (dispatch) => {
    try {
        const deleted = await axios.post('/api/link/delete', {index})

        dispatch({
            type: DELETE_TASK_SUCCESS,
            deletedTask: deleted
        })
    } catch (e) {
        console.log(e)
        dispatch({type: DELETE_TASK_FAIL, payload: e.message})
    }
}

export const completeTask = (index, flag) => async (dispatch) => {
    try {

        const completed = await axios.post('api/link/complete',{index, flag})
        completed.data.completed = flag
        completed.data.text = crypto.decrypt(completed.data.text)
        completed.data.date = crypto.decrypt(completed.data.date)

        dispatch({
            type:SET_COMPLETE_SUCCESS,
            completedTask: completed
        })

    } catch (e){
        console.log(e)
        dispatch({type:SET_COMPLETE_FAIL, payload: e.message})
    }
}