import React, {useEffect} from 'react'
import "../styles/button&menu.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchCards} from "../actions/tableAction";

export const ListCards = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCards())
    }, [fetchCards, dispatch])

    let clients = useSelector(state => state.table.cards)

    return (
        <div className="row">
            <div className="upperPart" >

            </div>
            <div className="row" >
                <div className="total">
                    {`Total cards : ${clients.length}`}
                </div>
            </div>
            <div className="column" >
                <section className="taskList" >
                    <ul className="collection">
                        <table>
                            <caption></caption>
                            <tr>
                                <th>Number</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Percent</th>
                            </tr>
                            {clients.map(op => (
                                <tr>
                                    <th>{op.card_number}   </th>
                                    <th>{op.card_type}</th>
                                    <th>{op.date}</th>
                                    <th>{op.percent}</th>
                                </tr>
                            ))}
                        </table>
                    </ul>
                </section>
            </div>
        </div>
    )
}