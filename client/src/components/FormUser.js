import React, {useState} from 'react'
import {useMessage} from "../hooks/message.hook";

export const FormUser = ({addUser}) => {
    const [value, setValue] = useState('')
    const [sup, setSup] = useState(false)

    function validateEmail(email) {
        const pattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(email).toLowerCase());
    }
    const submitHandler = event => {
        event.preventDefault()
        if (value.trim()) {
            setValue('')
        }
    }
    const createHandler = async (event) => {
        if (event.keyCode === 13){
            if (validateEmail(value)){
                addUser(value, sup)
            } else {
                console.log("wrong email")
            }
        }
    }

    return (
        <div className="column-1">
        <form
            onSubmit={submitHandler}
        >
                <div className="addNew">
                    <label
                        className="active"
                        htmlFor="input_text">
                        Add new ...
                    </label>
                    <input
                        value={value}
                        id="input_text"
                        type="text"
                        className="validate"
                        onChange={ e => {setValue(e.target.value)}}
                        onKeyDown={e => createHandler(e)}
                    />

                </div>
            </form>
            <div className="row">
                {sup &&
                    <button className="button-6" onClick={() => setSup(!sup)}>
                        Super User
                    </button>
                }
                {!sup &&
                    <button className="button-6" onClick={() => setSup(!sup)}>
                       Default User
                    </button>
                }
            </div>
        </div>
)}