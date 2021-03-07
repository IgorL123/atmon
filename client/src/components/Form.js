import React, {useState} from 'react'

export const Form_Newtask = () => {
    const [value, setValue] = useState('')

    const submitHandler = event => {
        event.preventDefault()

        //  Создание задачи
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
                            onChange={ e => setValue(e.target.value)}
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
