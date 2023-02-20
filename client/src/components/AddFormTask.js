import React, {useState} from 'react'


export const AddFormTask = ({createTask, date}) => {
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
                createTask(value, date)
            } catch (e) {console.log(e)}
        }
    }

    return (
        <form
            onSubmit={submitHandler}
        >
            <div className="row">
                <ul className="collection">
                       <li className="item"
                        >
                        <div className="oneTask">
                            <span className="taskTitle" > {} </span>
                            {
                            <input
                                value={value}
                                id="myInput"
                                type="text"
                                autoComplete="off"
                                placeholder="Add new task..."
                                onChange={ e => {setValue(e.target.value)}}
                                onKeyPress={e => createHandler(e)}
                            /> }
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    )
}