import React from 'react'
import {NewAuthComponent} from "./NewAuthConponent";
import "../styles/button&menu.css"
import {logout} from "../actions/authAction";
import {connect, useDispatch} from "react-redux";

export const Navbar = () => {

    const dispatch = useDispatch()
    const logoutHandler = event => {
        event.preventDefault()

        try {
            dispatch(logout())
        } catch (e) {
            console.log(e)
        }
    }

    return (
      <nav className="appNavBar">
        <span id="navLogo">Monitoring</span>
        <ul id="nav-mobile" className="">
          <li>
              <button className="navbutton"> CREATE </button>
              <button className="navbutton"> USERS </button>
              <button className="navbutton" onClick={logoutHandler}>EXIT</button>
          </li>
        </ul>
      </nav>
    )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = dispatch => ({
    logout, dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)