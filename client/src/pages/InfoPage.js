import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import {fetchAtmDate, fetchChart, fetchCurDate} from "../actions/tableAction";
import {Navbar} from "../components/Navbar";
import {fetchOpsRange} from "../actions/opAction";
import {formatDate} from "../components/ListOperations"
import {List} from "../components/List";
import {ListGrouped} from "../components/ListGrouped";
import {ListCurGrouped} from "../components/ListCurGroup";
import {Chart} from "../components/Chart";

export const InfoPage = () => {
    const dispatch = useDispatch()
    const [startDate, setDate] = useState( new Date() )
    const [endDate, setDateEnd] = useState( new Date() )
    const [table, setTable]  = useState('opers')
    let ops = useSelector(state => state.opReducer.ops)
    let atms = useSelector(state => state.table.atms)
    let curs = useSelector(state => state.table.currency)
    const data = useSelector(state => state.table.chart)

    useEffect(() => {
        setDate(startDate)
        setDateEnd(endDate)
        dispatch(fetchOpsRange(formatDate(startDate), formatDate(endDate)))
        dispatch(fetchAtmDate(formatDate(startDate), formatDate(endDate)))
        dispatch(fetchCurDate(formatDate(startDate), formatDate(endDate)))
        dispatch(fetchChart(formatDate(startDate), formatDate(endDate)))
    },[fetchOpsRange, startDate, endDate, dispatch])

    let sum = 0;
    ops.map(op => {
        if (op.bank_name !== "СберБанк" && new Date(op.date).getDate() === startDate.getDate()){
            sum = sum + Math.abs(op.value * 0.012 * op.exchange_ration2rub);
        }
    })

    return (
        <main className="mainApp">
            <Navbar />
            <Fragment>
                <div className="sectionContainer">
                    <section className="mainSection">
                        <section className="tasksMain">
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
                                        onClick={() => setDateEnd(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 1))} >
                                        Prev
                                    </button>
                                    <button
                                        onClick={() => setDateEnd(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1))} >
                                        Next
                                    </button>

                                </div>
                                <div className="row_centre">{formatDate(startDate) +" --- " + formatDate(endDate)}
                                </div>

                                <button className="button-6" onClick={() => setTable('atms')}> Group By atm</button>
                                <button className="button-6" onClick={() => setTable('opers')}> Transactions</button>
                                <button className="button-6" onClick={() => setTable('cur')}> Group by curs</button>
                                <button className="button-6" onClick={() => setTable('com')}> Commissions</button>
                                <button className="button-6" onClick={() => setTable('dyn')}> Commissions dynamic</button>
                                <section className="taskList" >
                                    <ul className="collection">
                                        { table === 'opers' &&
                                        <List
                                            operations={ops}/>
                                        }
                                        {table === 'atms' &&
                                            <ListGrouped
                                            operations={atms}/>
                                        }
                                        {table === 'cur' &&
                                            <ListCurGrouped
                                                operations={curs}/>
                                        }
                                        {table === 'com' &&
                                            <h3 align="center">{`Total commission:  ${Math.round(sum)} Rub`}</h3>

                                        }
                                        {table === 'dyn' &&
                                            <Chart data={data}/>
                                        }
                                    </ul>
                                </section>
                            </div>
                        </section>
                    </section>
                </div>
            </Fragment>
        </main>
    )
}