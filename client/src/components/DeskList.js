import React from 'react'
import "../styles/button&menu.css"

export const DeskList = ({desks, setNewDesk, deleteDesk}) => {

    if (!desks.length){
        return <p className="center"> No desks already</p>
    }
    /*
        const dropDown = () => {
            document.getElementById("myDropdown").classList.toggle("show"}
        /*
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                let dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
         */
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
                    { board.text !== "default" &&
                    <div className="dropdown">
                        <button className="closebutton"
                                    onClick={() => {
                                        deleteHandler(board._id, board.text)
                                        //deleteDesk(board._id, board.text)
                                    }}> delete

                        </button>
                        {/*
                        <div id="myDropdown" className="dropdown-content">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                        </div> */}
                    </div>}

                </li>
            ))}
        </ul>

    )
}