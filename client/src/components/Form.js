import React, {useState} from 'react'


export const FormNewTask = ({createTask}) => {
    const [value, setValue] = useState('')

    const submitHandler = event => {
        event.preventDefault()

        if (value.trim()) {
            setValue('')
        }
    }

    const createHandler = async (e) => {
        if (e.key === 'Enter'){
            try{
                createTask(value)
            } catch (e) {console.log(e)}
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
                            Input new task:
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