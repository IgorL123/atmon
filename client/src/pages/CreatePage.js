import React, {Fragment, useEffect, useState} from 'react'
import {Navbar} from "../components/Navbar"
import {DeskList} from "../components/DeskList"
import {fetchTask, createTask1, deleteTask1, completeTask} from "../actions/taskAction"
import {createDesk, fetchDesks, setDesk, deleteDesk} from "../actions/deskAction";
import {useDispatch, useSelector} from 'react-redux'
import {AddFormDesk} from "../components/AddFormDesk";
import {ListWheel} from "../components/ListWheel";

import Cookies from "js-cookie";

export const CreatePage = () => {
    const [asideOpen, setAsideOpen] = useState(false)
    const userId = Cookies.get('userID');
    const dispatch = useDispatch()
    const curDesk = useSelector(state => state.desk.currentDesk)

    useEffect(() => {
        dispatch(fetchTask(curDesk, userId))
        dispatch(fetchDesks(userId))
    }, [fetchTask, fetchDesks, dispatch])

    let task = useSelector(state => state.taskReducer.tasks)
    const desk = useSelector(state => state.desk.desks)

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
                          <ListWheel
                          tasks={task}
                          deleteTask={(id) => {
                              dispatch(deleteTask1(id))
                              //dispatch(fetchTask(curDesk, userId))
                          }}
                          createTask={(value, date) => {
                              dispatch(createTask1(value, curDesk, userId, date))
                          }}
                          completeTask={(id, flag) => dispatch(completeTask(id, flag))}>

                          </ListWheel>
                      </section>
                      <aside className="asideMenu">
                          <div className="asideButton" onClick={asideFunction}>
                              |||
                          </div>
                          <div className="asideForm">
                              <DeskList
                                desks={desk}
                                setNewDesk={(deskId,deskInf) => {
                                    dispatch(setDesk(deskInf))
                                    dispatch(fetchTask(deskInf, userId))
                                }}
                                deleteDesk={ (index, deskInfo) => dispatch(deleteDesk(index, deskInfo))}
                              />
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

