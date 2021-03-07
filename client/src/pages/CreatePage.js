import React, {useState, useEffect, useContext, Fragment} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContex";
import {Form_Newtask} from "../components/Form.js"
import {List_Tasks} from "../components/List";


export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link,setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    
    const pressHandler =  async event => {
          if(event.key === 'Enter') {
              try {
                  const data = await request('/api/link/make', 'POST', {from: link}, {
                  Authorization: `Bearer ${auth.token}`
                   })
                  console.log(data)
              } catch (e) {}

         }
    }

    const tasks = new Array(3)
        .fill('')
        .map((_, i) => ({id: i, text: `Task_${i + 1}`}))
    
    return (
        <Fragment>
            <Form_Newtask/>

            <hr/>

            <List_Tasks tasks={tasks}/>
        </Fragment>
    )
}

