import React, {useEffect, useState} from "react"
import {List} from "./List";
import {ListClients} from "./ListClients";

export const ListOperations = ({ops, blockOp}) => {
    const [startDate, setDate] = useState( new Date() )

    useEffect(() => {
        setDate(startDate)
    },[startDate])

    const prettyDate = (date) => {
        const months = ["January","February","March","April","May","June","July","August","September",
            "October","November","December"]
        const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear()
    }

    let sum = 0;
    let trans = 0;
    ops.map(op => {
        if (op.bank_name !== "СберБанк" && new Date(op.date).getDay() === startDate.getDay()){
           sum = sum + Math.abs(op.value * 0.012 * op.exchange_ration2rub);
        }
        if (new Date(op.date).getDay() === startDate.getDay()){
            trans += 1;
        }
    })


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
            <div className="row" >
                <div className="total">
                    {`Day commission : ${Math.round(sum)}`}
                </div>
                <div className="total">
                    {`Day transactions : ${trans}`}
                </div>
            </div>

            {(
                <div className="column" >
                    <h3> {prettyDate(startDate)}</h3>
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