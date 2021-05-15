import React, {useState} from 'react'


export const AddFormDesk = ({createNewDesk}) => {
    const [value, setValue] = useState('')

    const submitHandler = event => {
        event.preventDefault()

        if (value.trim()) {
            setValue('')
        }
    }
    const createHandler = async (event) => {
        if (event.key === 'Enter'){
            createNewDesk(value)
        }

    }

    return (
        <form
            onSubmit={submitHandler}
        >
            <div className="row">
                <ul className="collection">
                    <li  className="item" >
                        <div className="oneDesk">
                            <span  className="deskTitle"> </span>
                                {<input
                                        value={value}
                                        id="myInputDesk"
                                        type="text"
                                        placeholder="Add new desk..."
                                        autoComplete="off"
                                        onChange={ e => {setValue(e.target.value)}}
                                        onKeyPress={e => createHandler(e)}
                                />}
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    )
}