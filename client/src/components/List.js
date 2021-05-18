import React, {useState} from 'react'
import "../styles/button&menu.css"


export const ListTasks = ({tasks, deleteTask, completeTask}) => {

    /*
    if (!tasks.length){
        return <p className="center"> No tasks already</p>
    }
     */

    let normalizeDate = (mydate) => {
        let myDateObject = new Date(mydate);
        let dd = myDateObject.getDate();
        let mm = myDateObject.getMonth();
        let yyyy = myDateObject.getFullYear();
        return mm + '.' + dd + '.' + yyyy;  // Date format: 2.27.2020
    }
    const normDate = (prevDate) => {
        const date = new Date(prevDate)
        return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear()
    }

    const deleteHandler = async (event, taskId) => {
        //event.preventDefault()
        try {
            deleteTask(taskId)
        } catch (e) { console.log(e) }
    }

    const completeHandler = async (index, flag) => {
        try{
            completeTask(index, flag)

        } catch (e) {console.log(e)}
    }

    return (

        <ul className="collection">
            {tasks.map(task => (
                <li
                    className="item"
                    key={task._id}>
                    { !task.completed &&
                    <div className="buttonCheck"
                         onClick={() => completeHandler(task._id, true)}>
                    </div>}
                    {task.completed &&
                    <div className="buttonCheck"
                         onClick={() => completeHandler(task._id, false)}>
                    </div> }

                    <div className="oneTask">
                        { !task.completed &&
                        <span className="taskTitle" > {task.text} </span>}
                        { task.completed &&
                        <span className="taskTitleLine" >
                            {task.text} </span>}
                        <span className="taskDate">{ }</span>
                    </div>

                    <button className="closebutton"
                            onClick={(event) => deleteHandler(event, task._id)}
                    >Delete</button>


                </li>
            ))}
        </ul>

    )
}