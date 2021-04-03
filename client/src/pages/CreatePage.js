import React, {useState, useCallback, useEffect, useContext, Fragment} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContex"
import {FormNewTask} from "../components/Form.js"
import {ListTasks} from "../components/List"
import {Loader} from "../components/Loader"
import {Navbar} from "../components/Navbar"



export const CreatePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [tasks, setTasks] = useState([])
    const [del, setDel] = useState([])
    
    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })
            setTasks(fetched)
        } catch (e) {}
    }, [token, request])

    const deleteTask = useCallback(async (index) => {
        try {
            const deleted = await request('/api/link/delete', 'POST', {index},
                {
                    Authorization: `Bearer ${token}`
                })
            setDel(deleted)
        } catch (e) {}
    }, [token, request])

    const createTask = useCallback(async (event, value) => {
        if (event === 'Enter') {
            try {
                console.log("1213")
                const created = await request('/api/link/make', 'POST',{value},
                    {Authorization: `Bearer ${token}` })
                setTasks(...created)
            } catch (e) {}
        }
    }, [token, request])


    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    /*  Работает как говно
    if (loading) {
        return (
            <Loader/>
            )
    }
     */

    return (
      <main className="mainApp">
        <Navbar />
        <Fragment>
            <div className="sectionContainer">
                <section className="mainSection">
                    <section className="tasksMain">
                        <section className="taskList">
                            <FormNewTask
                              saveTask={ () => fetchTasks()}
                              createTask={ (e, value) => createTask(e, value)}
                            />
                            <ListTasks
                              tasks={tasks}
                              deleteTask={ (id) => {
                                  deleteTask(id)
                                  fetchTasks()
                              }}
                            />
                        </section>
                    </section>
                    <aside className="asideMenu">

                    </aside>
                </section>
            </div>
        </Fragment>
      </main>
    )
}

