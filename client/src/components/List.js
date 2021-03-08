import React, {useState} from 'react'


export const ListTasks = ({tasks, deleteTask}) => {
    const [clicks, setClicks] = useState(0)

    if (!tasks.length){
        return <p className="center"> No tasks already</p>
    }

    return (
        <ul className="collection">
            {tasks.map(task => (
                <li
                    className="collection-item note"
                    key={task.id}>

                    <div>
                        <strong> {task.text} </strong>
                        <small>{ task.date}</small>
                    </div>

                    <a
                        className="waves-effect waves-red btn-flat"
                        onClick={() => {
                            deleteTask(task._id)
                        }}
                    >Delete
                    </a>
                </li>
            ))}
        </ul>
    )
}