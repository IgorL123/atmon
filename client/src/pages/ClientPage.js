import {Navbar} from "../components/Navbar";
import React, {Fragment} from "react";
import {ListClientPage} from "../components/ListClientPage";

export const ClientPage = () => {
    return (
        <main className="mainApp">
            <Navbar/>
            <Fragment>
                <div className="sectionContainer">
                    <section className="mainSection">
                        <section className="tasksMain">
                                <ListClientPage/>
                        </section>
                    </section>
                </div>

            </Fragment>
        </main>
    )
}