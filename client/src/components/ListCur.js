import React, {useEffect} from 'react'
import "../styles/button&menu.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrency} from "../actions/tableAction";

export const ListCur = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCurrency())
    }, [fetchCurrency, dispatch])

    let cur = useSelector(state => state.table.currency)
    let ver = 0
    cur.map( cl => {
        if (cl.verified === true){
            ver += 1
        }
    })

    return (
        <div className="row">
            <div className="upperPart" >

            </div>
            <div className="row" >
                <div className="total">
                    {`Total currencies : ${cur.length}`}
                </div>
            </div>
            <div className="column" >
                <section className="taskList" >
                    <ul className="collection">
                        <table>
                            <caption></caption>
                            <tr>
                                <th>Name</th>
                                <th>Exchange to RUB</th>
                                <th>Available</th>
                            </tr>
                            {cur.map(op => (
                                <tr>
                                    <th>{op.name}   </th>
                                    <th>{op.exchange_ration2rub}</th>
                                    <th>{op.available}</th>
                                </tr>
                            ))}
                        </table>
                    </ul>
                </section>
            </div>
        </div>
    )
}