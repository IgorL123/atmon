import React from 'react'
import "../styles/button&menu.css"

export const DeskList = ({desks, setNewDesk}) => {

    if (!desks.length){
        return <p className="center"> No desks already</p>
    }

    const setHandler = async (event, boardId, boardName) => {
        event.preventDefault()
        setNewDesk(boardId, boardName)
    }
    return (
        <ul className="collection">
            {desks.map(board => (
                <li
                className="item"
                key={board._id}>
                    <div className="oneDesk">
                        <span
                            className="deskTitle"
                            onClick={(e) => setHandler(e, board._id, board.text)}
                        > {board.text} </span>
                    </div>
                </li>
            ))}
        </ul>

    )
}