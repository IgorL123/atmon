import React, {useEffect} from 'react'
import "../styles/button&menu.css"
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, fetchUsers} from "../actions/userAction";
import {FormUser} from "./FormUser";

export const ListUsers = ({addUser}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [fetchUsers, dispatch])

    let users = useSelector(state => state.user.users)
    let ver = 0
    users.map( cl => {
        if (cl.superuser === true){
            ver += 1
        }
    })

    return (
        <div className="column-1">
        <div className="row">
            <div className="upperPart" >
            </div>
            <div className="row" >
                <div className="total">
                    {`Total users : ${users.length}`}
                </div>
                <div className="total">
                    {`Total super users : ${ver}`}
                </div>
            </div>
            <div className="column" >
                <section className="taskList" >
                    <ul className="collection">
                        <table>
                            <caption></caption>
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Super User</th>
                                <th>Delete</th>
                            </tr>
                            {users.map(op => (
                                <tr>
                                    <th>{op.id}   </th>
                                    <th>{op.email}</th>
                                    <th>{op.superuser ? "YES" : "NO"}</th>
                                    <th className="blocked" onClick={(email) => dispatch(deleteUser(op.email))}>delete</th>
                                </tr>
                            ))}
                        </table>
                    </ul>
                </section>
            </div>
        </div>
            <FormUser addUser={addUser}>
            </FormUser>
        </div>
    )
}