import React, {Fragment, useEffect, useState} from 'react'
import {Navbar} from "../components/Navbar"
import {DeskList} from "../components/DeskList"
import {fetchTask, createTask1, deleteTask1, completeTask} from "../actions/taskAction"
import {createDesk, fetchDesks, setDesk, deleteDesk} from "../actions/deskAction";
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
        let deskTitle = document.getElementsByClassName("deskTitle");
        console.log(deskTitle);
        if (!asideOpen) {
            asidePart.style.width = `30%`;
            mainPart.style.width = `calc(70% - 29px)`
            neibor.style.width = 100 + "%";
            neibor.style.visibility = "visible";
            setAsideOpen(true);
        } else {
            asidePart.style.width = `50px`;
            mainPart.style.width = `calc(100% - 29px - 50px)`;
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
                              //dispatch(fetchTask(curDesk, userId))
                          }}
                          createTask={(value, date) => {
                              dispatch(createTask1(value, curDesk, userId, date))
                          }}
                          completeTask={(id) => dispatch(completeTask(id))}>

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

