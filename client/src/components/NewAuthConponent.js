import React, {useState,useEffect} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "react-redux"
import {signup, login, logout } from "../actions/authAction";
import {Redirect} from "react-router-dom";

export const NewAuthComponent = ({display, closeDisplay, authType, changeAuthType}) => {

  const dispatch = useDispatch()
  const fAuth = useSelector(state => state)
  const errorText = useSelector(state => state.alert.error)
  // const [someMessage, setSomeMessage] = useState('');


  let modal = document.getElementsByClassName('authorization')[0];
// When the user clicks anywhere outside the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      closeDisplay();
    }
  }

  // Auth

  const message = useMessage();
  const {error, clearError} = useHttp();

  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect( () => {
    message(error);
    clearError();
  }, [error, message, clearError]);


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }


  const validate = (email, password) => {
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPassword = /^[a-zA-Z0-9]{3,20}$/
    if(!regEmail.test(email)){
      return false;
    }
    return regPassword.test(password);

  }

  const registerHandler = async () => {
    try {
      if (validate(form.email, form.password)){
        await dispatch(signup(form))
      } else {
        message("Invalid email or password...")
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const loginHandler = async () => {
    try {
      if (validate(form.email, form.password)){
        await dispatch(login(form))
      } else {
        message("Invalid email or password...")
      }

    } catch (e) {
    console.log(e.message)
    }

    if (fAuth.isAuthenticated){
      return (<Redirect to="/create" />)
    }

  }
  let isLoading = useSelector(state => state.auth.isLoading);
  if (isLoading === undefined) {
    isLoading = false;
  }



  useEffect(() => {
    const type = authType;
    const authSpanToChange  = document.getElementById("authSpanToChange");
    const signUpInButton    = document.getElementById("signUpInButton");
    const switchAuthButton  = document.getElementById("switchAuthButton");
    if (type === "signIn") {
      authSpanToChange.innerHTML  = "Sing In to Get Started";
      signUpInButton.innerHTML    = "Sign In";
      switchAuthButton.innerHTML  = "Not a member yet? Sign up for free";
      switchAuthButton.className  = "singInButton";
    } else if (type === "signUp") {
      authSpanToChange.innerHTML  = "Sing Up to Get Started";
      signUpInButton.innerHTML    = "Sign Up";
      switchAuthButton.innerHTML  = "Have an account? Click to sign in";
      switchAuthButton.className  = "singUpButton";
    }
  }, [authType])

  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      if (authType === "signIn") {
        loginHandler()
      } else {
        registerHandler()
      }
    }
  }

  useEffect(() => {
    const type              = authType;
    const signUpInButton    = document.getElementById("signUpInButton");

    if (type === "signIn") {
      signUpInButton.onclick      = loginHandler;
    } else if (type === "signUp") {
      signUpInButton.onclick      = registerHandler;
    }
  }, [authType, form])



  let text = '';
  if (errorText) {
    text = errorText;
  }

  if (isLoading) {
    text = 'Loading...'
  }


  return (

    <section className="authorization" style={{display: display}}>

      <div className="form animate">
        <div className="close">
          <button onClick={closeDisplay}>&times;</button>
        </div>
        <div className="SignInForm">

          <span id="authSpanToChange">Sing Up/In to Get Started</span>


          {/*{ errorText &&*/}
          {/*    <div className="error"> {errorText}*/}
          {/*    </div>*/}
          {/*}*/}

          <div className="inputFields">

            <span id="authErrorMessage">{text}</span>

            <label htmlFor="email">Email</label>
            <div className="input-field">
              <input
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  onKeyPress={onPressEnter}
                  maxLength="40"
              />
            </div>

            <label htmlFor="email">Password</label>
            <div className="input-field">
              <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  onKeyPress={onPressEnter}
                  maxLength="20"
              />
            </div>

            <div className="authButton">
              <button
                  id="signUpInButton"
                  disabled={isLoading}
                  onClick={loginHandler}
              >
              </button>

              <div className="switchAuth">
                <button
                    className=""
                    id="switchAuthButton"
                    onClick={changeAuthType}
                >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
const mapDispatchToProps = dispatch => ({
  login, logout, signup: signup, dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(NewAuthComponent)