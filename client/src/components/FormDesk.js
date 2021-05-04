import React, {useState, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContex";


export const FormDesk = ({createNewDesk}) => {
    const [value, setValue] = useState('')

    const submitHandler = event => {
        event.preventDefault()

        if (value.trim()) {
            setValue('')
        }
    }
    const createHandler = async (event) => {
        if (event === 'Enter'){
            createNewDesk(value)
        }

    }

    return (
        <form
            onSubmit={submitHandler}
        >
            <div className="row">
                <div className="addNew">
                    <label
                        className="active"
                        htmlFor="input_text">
                        Add new desk
                    </label>
                    <input
                        value={value}
                        id="input_text"
                        type="text"
                        className="validate"
                        onChange={ e => {setValue(e.target.value)}}
                        onKeyPress={e => createHandler(e)}
                    />
                </div>
            </div>
        </form>
    )
}