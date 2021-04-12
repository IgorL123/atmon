import React, {useState, useCallback, useEffect, useContext, Fragment} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContex"
import {FormNewTask} from "../components/Form.js"
import {ListTasks} from "../components/List"
import {Navbar} from "../components/Navbar"
import {DeskList} from "../components/DeskList";
import {FormDesk} from "../components/FormDesk";


export const CreatePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [tasks, setTasks] = useState([])
    const [del, setDel] = useState([])
    const [curDesk, setCurDesk] = useState("default")
    const [desks, setDesks] = useState([])
    
    const fetchTasks = useCallback(async (deskInfo) => {
        try {
            const fetched = await request('/api/link/get', 'POST', {deskInfo},
                {
                    Authorization: `Bearer ${token}`
                })
            setTasks(fetched)
        } catch (e) { console.log(`Error: ${e}`) }
    }, [token, request])

    const deleteTask = useCallback(async (index, deskInfo) => {
        // нужно ускорить
        try {
            const deleted = await request('/api/link/delete', 'POST', {index, deskInfo},
                {
                    Authorization: `Bearer ${token}`
                })
            setDel(deleted)
        } catch (e) { console.log(`Error: ${e}`)}
    }, [token, request])

    const createTask = useCallback(async (event, value, deskInfo) => {
        if (event === 'Enter') {
            try {
                const created = await request('/api/link/make', 'POST',{value, deskInfo},
                    {Authorization: `Bearer ${token}` })
                setTasks(...created)
            } catch (e) { console.log(`Error: ${e}`)}
        }
    }, [token, request])

    const fetchDesk = useCallback( async () => {
        try {
            const fetch = await request('/api/desk/getdesks', 'GET', null,
                {Authorization: `Bearer ${token}` })
            setDesks(fetch)
        } catch (e) { console.log(`Error: ${e}`)}

    }, [request, token])

    const createDesk = useCallback(async (event, value) => {
        if (event === 'Enter') {
            try {
                const created = await request('/api/desk/createdesk', 'POST', {value},
                    {Authorization: `Bearer ${token}` })
                setDesks(...created)
            } catch (e) { console.log(`Error: ${e}`)}
        }
    }, [token, request])


    useEffect(() => {
        fetchTasks("default")
    }, [fetchTasks])

    useEffect(() => {
        fetchDesk()
    }, [fetchDesk])




    return (
      <main className="mainApp">
        <Navbar />
        <Fragment>
            <div className="sectionContainer">
                <section className="mainSection">
                    <section className="tasksMain">
                        <section className="taskList">
                            <FormNewTask
                              saveTask={ () => fetchTasks(curDesk)}
                              createTask={ (e, value) => createTask(e, value, curDesk)}
                            />

                            <ListTasks
                              tasks={tasks}
                              deleteTask={ (id) => {
                                  deleteTask(id)
                                  // Работает через раз хз почему
                                  fetchTasks(curDesk)
                              }}
                            />


                        </section>
                    </section>
                    <aside className="asideMenu">
                        <section className="deskList">
                            <FormDesk
                                saveDesk={ () => fetchDesk()}
                                createDesk={ (e, value) => createDesk(e, value, curDesk)}
                            />
                            <DeskList
                                desks={desks}
                                setNewDesk={(board) => {
                                    setCurDesk(board.text)
                                    fetchTasks(curDesk)
                                }}
                            />
                        </section>

                    </aside>
                </section>
            </div>
        </Fragment>
      </main>
    )
}

