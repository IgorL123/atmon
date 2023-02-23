import React, {useEffect, useState} from 'react'
import "../styles/button&menu.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchClients} from "../actions/tableAction";

export const ListClients = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchClients())
    }, [fetchClients, dispatch])

    let clients = useSelector(state => state.table.clients)
    let ver = 0
    clients.map( cl => {
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
                    {`Total users : ${clients.length}`}
                </div>
                <div className="total">
                    {`Total verified : ${ver}`}
                </div>
            </div>
            <div className="column" >
                <section className="taskList" >
                    <ul className="collection">
            <table>
                <caption></caption>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date birth</th>
                    <th>Phone number</th>
                    <th>Verified</th>
                </tr>
                {clients.map(op => (
                    <tr>
                        <th>{op.name}   </th>
                        <th>{op.email}</th>
                        <th>{op.date_birth}</th>
                        <th>{op.phone_number}</th>
                        <th>{op.verified ? "YES" : "NO"}</th>
                            </tr>
                ))}
            </table>
                    </ul>
                </section>
            </div>
        </div>
    )
}