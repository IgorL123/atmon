import React, {Fragment} from 'react';
import {Navbar} from "../components/Navbar";
import {ListUsers} from "../components/ListUsers";
import {useDispatch} from "react-redux";
import {addUser} from "../actions/userAction";

export const UsersPage = () => {
    const dispatch = useDispatch()
    return (
        <main className="mainApp">
            <Navbar/>
            <Fragment>
                <div className="sectionContainer">
                    <section className="mainSection">
                        <section className="tasksMain">

                            <ListUsers addUser={(email, user) => dispatch(addUser(email, user))}
                            ></ListUsers>

                        </section>
                    </section>
                </div>

            </Fragment>
        </main>
    )
}