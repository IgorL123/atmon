import React, {Fragment, useEffect, useState} from 'react'
import {Navbar} from "../components/Navbar"
import {DeskList} from "../components/DeskList"
import {fetchOps, blockOp} from "../actions/opAction"
import {createDesk, fetchDesks, setDesk, deleteDesk} from "../actions/deskAction";
import {useDispatch, useSelector} from 'react-redux'
import {AddFormDesk} from "../components/AddFormDesk";
import Cookies from "js-cookie";
import {ListOperations} from "../components/ListOperations";

export const CreatePage = () => {
    const [asideOpen, setAsideOpen] = useState(false)
    const userId = Cookies.get('userID');
    const dispatch = useDispatch()
    const curDesk = useSelector(state => state.desk.currentDesk)

    useEffect(() => {
        dispatch(fetchOps())
        dispatch(fetchDesks(userId))
    }, [fetchOps, fetchDesks, dispatch])

    let ops = useSelector(state => state.opReducer.ops)

    function asideFunction(event) {
        let neibor = event.target.nextSibling;
        let mainPart = (document.getElementsByClassName("tasksMain"))[0];
        let asidePart = (document.getElementsByClassName("asideMenu"))[0];
        let deskTitle = document.getElementsByClassName("deskTitle");
        if (!asideOpen) {
            event.target.classList.add('open');
            asidePart.classList.add('open');
            mainPart.classList.add('open');

            event.target.innerHTML = "X";
            setAsideOpen(true);
        } else {
            event.target.classList.remove('open');
            asidePart.classList.remove('open');
            mainPart.classList.remove('open');

            event.target.innerHTML = "|||";

            setAsideOpen(false);
        }
    }

    return (
      <main className="mainApp">
          <Navbar />
          <Fragment>
              <div className="sectionContainer">
                  <section className="mainSection">
                      <section className="tasksMain">
                          <ListOperations
                          ops={ops}
                          blockOp={(id) => { dispatch(blockOp(id)) }}>

                          </ListOperations>
                      </section>
                      <aside className="asideMenu">
                          <div className="asideButton" onClick={asideFunction}>
                              |||
                          </div>
                          <div className="asideForm">

                              <AddFormDesk createNewDesk={ (value) => {
                                  dispatch(createDesk(value, userId))
                              }} />
                          </div>
                      </aside>
                  </section>
              </div>
          </Fragment>
      </main>
    )
}

