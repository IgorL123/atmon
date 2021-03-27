import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContex";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav className="appNavBar">
            <span id="navLogo">Logo</span>
            <ul id="nav-mobile" className="">
                {/*<li><NavLink to="/create">To</NavLink></li>*/}
                <li><a href="">LOL</a></li>
                <li><a href="/" onClick={logoutHandler}>Exit</a></li>
            </ul>
        </nav>
    )
}