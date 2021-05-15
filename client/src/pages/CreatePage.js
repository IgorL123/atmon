import React, {Fragment, useEffect, useState} from 'react'
import {Navbar} from "../components/Navbar"
import {DeskList} from "../components/DeskList"
import {fetchTask, createTask1, deleteTask1} from "../actions/taskAction"
import {createDesk, fetchDesks, setDesk} from "../actions/deskAction";
import {useDispatch, useSelector} from 'react-redux'
import {AddFormDesk} from "../components/AddFormDesk";
import {ListWheel} from "../components/ListWheel";


export const CreatePage = () => {
    const [asideOpen, setAsideOpen] = useState(false)
    const userId = useSelector(state => state.auth.userId)
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
        if (!asideOpen) {
            asidePart.style.width = (parseInt(getComputedStyle(asidePart)["width"]) + 300) + "px";
            mainPart.style.width = (parseInt(getComputedStyle(mainPart)["width"]) - 300) + "px";
            neibor.style.width = 100 + "%";
            neibor.style.visibility = "visible";
            setAsideOpen(true);
        } else {
            asidePart.style.width = (parseInt(getComputedStyle(asidePart)["width"]) - 300) + "px";
            mainPart.style.width = (parseInt(getComputedStyle(mainPart)["width"]) + 300) + "px";
            neibor.style.width = 0;
            neibor.style.visibility = "hidden";
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
                              dispatch(fetchTask(curDesk, userId))
                          }}
                          createTask={(value, date) => {
                              dispatch(createTask1(value, curDesk, userId, date))
                          }}>

                          </ListWheel>
                      </section>
                      <aside className="asideMenu">
                          <div className="asideButton" onClick={asideFunction}>
                              +
                          </div>
                          <div className="asideForm">
                              <DeskList
                                desks={desk}
                                setNewDesk={(deskId,deskInf) => {
                                    dispatch(setDesk(deskInf))
                                    dispatch(fetchTask(deskInf, userId))
                                }}
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

