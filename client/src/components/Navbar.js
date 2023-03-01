import React from 'react'
import "../styles/button&menu.css"
import {logout} from "../actions/authAction";
import {connect, useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/auth.hook";

export const Navbar = () => {
    const isSuperUser = useSelector(state => state.auth.isSuperUser)
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
              <Link to="/info">
                  <button className="navbutton"> INFO </button>
              </Link>
              <Link to="/create">
                  <button className="navbutton"> TABLES </button>
              </Link>
              {isSuperUser &&
              <Link to="/users">
                  <button className="navbutton"> USERS </button>
              </Link>}
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