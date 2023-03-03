import React, {useEffect} from 'react'
import "../styles/button&menu.css"
import {useDispatch, useSelector} from "react-redux";
import {addClient, fetchClients} from "../actions/tableAction";
import {FormClient} from "./FromClient";

export const ListClientPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchClients())
    }, [dispatch])

    let clients = useSelector(state => state.table.clients)

    return (
        <div className="row">
            <div className="upperPart">
                <FormClient addClient={(name, email, phone) => dispatch(addClient(name, email, phone))}></FormClient>
            </div>
            <section className="taskList" >
                <ul className="collection">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone_number</th>
                            <th>Date birth</th>
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
    )}