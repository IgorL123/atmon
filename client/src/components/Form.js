import React, {useState, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContex";


export const Form_Newtask = () => {
    const auth = useContext(AuthContext)
    const [value, setValue] = useState('')
    const {request} = useHttp()

    const pressHandler =  async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/make', 'POST',{
                    from: value
                }, {Authorization: `Bearer ${auth.token}` })

            } catch (e) {}
        }
    }

    const submitHandler = event => {
        event.preventDefault()


        if (value.trim()) {
            setValue('')
        }
    }

    return (
        <form
            onSubmit={submitHandler}
            >
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            value={value}
                            id="input_text"
                            type="text"
                            className="validate"
                            onChange={ e => {setValue(e.target.value)}}
                            onKeyPress={pressHandler}
                        />
                            <label
                                className="active"
                                htmlFor="input_text">
                                Input new task
                            </label>
                    </div>
            </div>
        </form>
    )
}
