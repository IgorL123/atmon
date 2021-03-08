import React, {useState, useCallback, useEffect, useContext, Fragment} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContex";
import {Form_Newtask} from "../components/Form.js"
import {List_Tasks} from "../components/List";
import {Loader} from "../components/Loader";



export const CreatePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [tasks, setTasks] = useState([])
    
    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })
            setTasks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    if (loading) {
        return <Loader/>
    }


    /* const task = new Array(3)
        .fill('')
        .map((_, i) => ({id: i, text: `Task_${i + 1}`})) */
    
    return (
        <Fragment>
            <Form_Newtask/>

            <hr/>
            <>
                {!loading && <List_Tasks tasks={tasks}/>}
            </>

        </Fragment>
    )
}

