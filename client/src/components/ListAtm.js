import React, {useEffect} from 'react'
import "../styles/button&menu.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchAtm} from "../actions/tableAction";

export const ListAtms = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAtm())
    }, [fetchAtm, dispatch])

    let clients = useSelector(state => state.table.atms)
    let ver = 0
    clients.map( cl => {
        if (cl.working === true){
            ver += 1
        }
    })

    return (
        <div className="row">
            <div className="upperPart" >

            </div>
            <div className="row" >
                <div className="total">
                    {`Total atms : ${clients.length}`}
                </div>
                <div className="total">
                    {`Total working : ${ver}`}
                </div>
            </div>
            <div className="column" >
                <section className="taskList" >
                    <ul className="collection">
                        <table>
                            <caption></caption>
                            <tr>
                                <th>Number</th>
                                <th>Bank</th>
                                <th>Place</th>
                                <th>Working</th>
                            </tr>
                            {clients.map(op => (
                                <tr>
                                    <th>{op.number}   </th>
                                    <th>{op.bank_name}</th>
                                    <th>{op.place}</th>
                                    <th>{op.working ? "YES": "NO"}</th>
                                </tr>
                            ))}
                        </table>
                    </ul>
                </section>
            </div>
        </div>
    )
}