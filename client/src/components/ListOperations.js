import React, {useEffect, useState} from "react"
import {blockOp, fetchOps} from "../actions/opAction";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";

export function formatDate(date) { // YYYY-MM-DD
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return yy + '-' + mm + '-' + dd;
}

export const ListOperations = () => {
    let ops = useSelector(state => state.opReducer.ops)
    const [startDate, setDate] = useState( new Date() )
    const dispatch = useDispatch()
    let sUser = Cookies.get('superuser')
    sUser = sUser === "true"

    useEffect(() => {
        setDate(startDate)
        dispatch(fetchOps(formatDate(startDate)))
    },[fetchOps, startDate, dispatch])


    const prettyDate = (date) => {
        const months = ["January","February","March","April","May","June","July","August","September",
            "October","November","December"]
        const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear()
    }

    let sum = 0;
    ops.map(op => {
        if (op.bank_name !== "СберБанк" && new Date(op.date).getDate() === startDate.getDate()){
           sum = sum + Math.abs(op.value * 0.012 * op.exchange_ration2rub);
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
                    {`Day transactions : ${ops.length}`}
                </div>
            </div>

            {(
                <div className="column" >
                    <h3> {prettyDate(startDate)}</h3>
                    <section className="taskList" >
                        <ul className="collection">
                            <table>
                                <caption></caption>
                                <tr>
                                    <th>Account</th>
                                    <th>Card</th>
                                    <th>Atm</th>
                                    <th>Value</th>
                                    <th>Currency</th>
                                    <th>Place</th>
                                    <th>Blocking</th>
                                </tr>
                                {ops.map(op => (
                                    <tr key={op.id}>
                                        <th>{op.account_id}</th>
                                        <th>{op.card_id}</th>
                                        <th>{op.atm_id}</th>
                                        <th>{op.value}</th>
                                        <th>{op.name}</th>
                                        <th>{op.place}</th>
                                        {sUser &&
                                            <th className="blocked" onClick={(index) => dispatch(blockOp(op.id))}>{op.blocked ? "YES" : "NO"}</th>
                                        }
                                        {!sUser &&
                                            <th className="blocked" onClick={() => console.log("No Asses")}>{op.blocked ? "YES" : "NO"}</th>
                                        }
                                    </tr>
                                ))}
                            </table>
                        </ul>
                    </section>
                </div>
            )}

        </div>

    )
}