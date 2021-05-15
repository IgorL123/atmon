import React, {useEffect, useState} from "react"
import {ListTasks} from "./List";
import {AddFormTask} from "./AddFormTask";

export const ListWheel = ({tasks, deleteTask, createTask}) => {
    const [startDate, setDate] = useState( new Date() )

    useEffect(() => {
        setDate(startDate)
    },[startDate])

    const changeDateHandler = async (flag) => {
        let td = new Date()
        if (flag) { setDate( new Date(td.getFullYear(), td.getMonth(), td.getDate() + 1)) }
        else { setDate( new Date(td.getFullYear(), td.getMonth(), td.getDate() - 1)) }
    }

    const getDates = ( d1, d2 ) => {
        let oneDay = 24 * 3600 * 1000
        let res
        for (let d = [],ms = d1*1 ,last = d2*1 ; ms < last; ms+=oneDay){
            d.push( new Date(ms) )
            res = d }
        return res;
    }
    const prettyDate = (date) => {
        const months = ["January","February","March","April","May","June","July","August","September",
        "October","November","December"]
        return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear()
    }

    const sortTasksByDate = (tasks, date) => {
        return tasks.filter(item => new Date(item.date).getDate() === date.getDate()); }
    let dateRange = getDates(startDate, startDate*1 + 3 * 24 * 3600 * 1000)

    return (
    <div className="row">
        <div className="upperPart" >
                    <button
                    onClick={() => setDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1))} >
                        Prev
                    </button>
                    <button
                    onClick={() => setDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1))} >
                        Next
                    </button>
                    <button
                        onClick={() => setDate(new Date())} >
                        Today
                    </button>
        </div>
        { dateRange.map(oneDate => (
            <div className="column" key={oneDate*1}>
                <section className="taskList" >
                    <h3> {prettyDate(oneDate)}</h3>
                    <ListTasks
                        tasks={sortTasksByDate(tasks, oneDate)}
                        deleteTask={ deleteTask } />
                    <AddFormTask createTask={createTask} date={oneDate} />
                </section>
            </div>
            ))}
    </div>

    )
}