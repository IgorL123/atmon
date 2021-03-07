import React from 'react'

export const List_Tasks = ({tasks}) => {

    return (
        <ul className="collection">
            {tasks.map(task => (
                <li
                    className="collection-item note"
                    key={task.id}>

                    <div>
                        <strong> {task.text} </strong>
                        <small>{new Date().toLocaleDateString()}</small>
                    </div>

                    <a
                        className="waves-effect waves-red btn-flat"
                    >Delete
                    </a>

                </li>
            ))}

        </ul>
    )
}