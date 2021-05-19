import React from 'react'
import "../styles/button&menu.css"
import {useSelector} from "react-redux";

export const DeskList = ({desks, setNewDesk, deleteDesk}) => {
    const curDesk = useSelector(state => state.desk.currentDesk)

    if (!desks.length){
        return <p className="center"> No desks already</p>
    }

    const getMainDesk = (desks) => {
        return desks.filter(item => item.text === "default" )}

    const setHandler = async (event, boardId, boardName) => {
        event.preventDefault()
        setNewDesk(boardId, boardName)
    }

    const deleteHandler = async(index, deskInfo) => {
        try{
            deleteDesk(index, deskInfo)
            setNewDesk(getMainDesk(desks), "default")
        } catch (e) {console.log(e)}
    }



    return (
        <ul className="collection">
            {desks.map((board, index) => {
                console.log(board.text, ' ', board.text === curDesk);
                return (

                <li
                className={board.text === curDesk ? "item currDesk" : "item"}
                //   className="item"
                key={board._id}>
                    <div className="oneDesk">
                        <span
                            className="deskTitle"
                            onClick={(e) => setHandler(e, board._id, board.text)}
                        > {board.text} </span>
                    </div>
                    { board.text !== "default" &&
                    <div className="dropdown">
                        <button className="closebutton"
                                    onClick={() => {
                                        deleteHandler(board._id, board.text)
                                    }}> delete

                        </button>
                    </div>}

                </li>
            )})}
        </ul>

    )
}