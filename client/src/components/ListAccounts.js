import React, {useEffect} from 'react'
import "../styles/button&menu.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchAccounts} from "../actions/tableAction";

export const ListAccounts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAccounts())
    }, [fetchAccounts, dispatch])

    let accs = useSelector(state => state.table.accounts)
    let blocks = 0;
    accs.map( ac => {
        if (ac.blocked === true){
            blocks += 1
        }
    })
    return (
        <div className="row">
            <div className="upperPart" >

            </div>
            <div className="row" >
                <div className="total">
                    {`Total accounts : ${accs.length}`}
                </div>
                <div className="total">
                    {`Total blocked : ${blocks}`}
                </div>
            </div>
            <div className="column" >
                <section className="taskList" >
                    <ul className="collection">
                        <table>
                            <caption></caption>
                            <tr>
                                <th>Number</th>
                                <th>Balance</th>
                                <th>Credit limit</th>
                                <th>INN</th>
                                <th>Blocked</th>
                            </tr>
                            {accs.map(op => (
                                <tr>
                                    <th>{op.number}   </th>
                                    <th>{op.value}</th>
                                    <th>{op.credit_limit}</th>
                                    <th>{op.inn}</th>
                                    <th>{op.blocked ? "YES" : "NO"}</th>
                                </tr>
                            ))}
                        </table>
                    </ul>
                </section>
            </div>
        </div>
    )
}