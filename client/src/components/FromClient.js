import React, {useState} from "react";


export const FormClient = ({addClient}) => {
    const [value, setValue] = useState({
        name: "", email: ""
    })

    function validateEmail(email) {
        const pattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(email).toLowerCase());
    }
    const submitHandler = event => {
        event.preventDefault()
        if (value.name.trim() || value.email.trim()) {
            setValue({name: "", email: ""})
        }
    }
    const createHandler = async (event) => {
        if (event.keyCode === 13){
            if (validateEmail(value.email)){
                addClient(value.name, value.email)
            } else {
                alert("Wrong email")
            }
        }
    }
    return (
        <div className="inputFields">
                <div className="input-field">
                    <label
                        className="active"
                        htmlFor="input_text">
                        Add new ...
                    </label>
                    <input
                        value={value.name}
                        id="input_text"
                        type="text"
                        className="validate"
                        onChange={ e => {setValue(e.target.value.name)}}
                        onKeyDown={e => createHandler(e)}
                    />

                </div>
                <div className="input-field">
                    <label
                        className="active"
                        htmlFor="input_text">
                    </label>
                    <input
                        value={value.email}
                        id="input_text"
                        type="text"
                        className="validate"
                        onChange={ e => {setValue(e.target.value.email)}}
                        onKeyDown={e => createHandler(e)}
                    />

                </div>
            </div>
    )}