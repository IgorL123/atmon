import React, {Fragment, useEffect, useState} from 'react'
import {Navbar} from "../components/Navbar"
import {useDispatch} from 'react-redux'
import {ListOperations} from "../components/ListOperations";
import {ListClients} from "../components/ListClients";
import {fetchClients} from "../actions/tableAction";
import {ListCur} from "../components/ListCur";
import {ListAccounts} from "../components/ListAccounts";
import {ListCards} from "../components/ListCards";
import {ListAtms} from "../components/ListAtm";

export const CreatePage = () => {
    const dispatch = useDispatch()
    const [startTable, setTable] = useState('transactions')

    useEffect(() => {
        dispatch(fetchClients())
        setTable(startTable)
    }, [startTable, dispatch])


    return (
      <main className="mainApp">
          <Navbar />
          <Fragment>
              <div className="sectionContainer">
                  <section className="mainSection">
                      <section className="tasksMain">
                          { startTable === "transactions" &&
                              <ListOperations>
                              </ListOperations>
                          }
                          { startTable === "clients" &&
                              <ListClients></ListClients>
                          }
                          { startTable === "cur" &&
                              <ListCur></ListCur>
                          }
                          {startTable === "accounts" &&
                              <ListAccounts></ListAccounts>
                          }
                          {startTable === "cards" &&
                              <ListCards></ListCards>
                          }
                          {startTable === "atms" &&
                              <ListAtms></ListAtms>
                          }
                          <div >
                              <button className="button-6" onClick={() => setTable("clients")}>Clients</button>
                              <button className="button-6" onClick={() => setTable("cur")}>Currencies</button>
                              <button className="button-6" onClick={() => setTable("accounts")}>Accounts</button>
                              <button className="button-6" onClick={() => setTable("atms")}>ATMS</button>
                              <button className="button-6" onClick={() => setTable("cards")}>Cards</button>
                              <button className="button-6" onClick={() => setTable("transactions")}>Transactions</button>

                          </div>
                      </section>
                  </section>
              </div>
          </Fragment>
      </main>
    )
}

