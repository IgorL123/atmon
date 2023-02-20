import React, {useEffect, useState} from "react"
import {List} from "./List";

export const ListOperations = ({ops, blockOp}) => {
    const [startDate, setDate] = useState( new Date() )

    useEffect(() => {
        setDate(startDate)
    },[startDate])

    const getDates = ( d1, d2 ) => {
        let oneDay = 24 * 3600 * 1000
        let res
        for (let d = [],ms = d1*1 ,last = d2*1 ; ms < last; ms+=oneDay){
            d.push( new Date(ms) )
            res = d }
        return res;
    }
    const prettyDate2 = (date) => {
        const months = ["January","February","March","April","May","June","July","August","September",
            "October","November","December"]
        const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear()
    }


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

            {(
                <div className="column" >
                    <h3> {prettyDate2(startDate)}</h3>
                    <section className="taskList" >
                        <List
                            ops={ops}
                            blockOp={blockOp}
                            date={startDate}>
                        </List>
                    </section>
                </div>
            )}
        </div>

    )
}