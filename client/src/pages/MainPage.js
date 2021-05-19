import React, {useState} from 'react';
import {NewNavBar} from '../components/NewNavBar'
import {MainPageMain} from "../components/MainPageMain"
import {NewAuthComponent} from "../components/NewAuthConponent";



export const MainPage = () => {

    const [display, setDisplay] = useState("none");
    const [authType, setAuthType] = useState(null);


    const changeAuthType = (event) => {
        const buttonClass = event.target.className;
        if (buttonClass == "singInButton") {
            setAuthType("signUp");
        } else {
            setAuthType("signIn");
        }
    }

    const openDisplaySignIn = () => {
        setDisplay("block");
        setAuthType("signIn");
    }

    const openDisplaySignUp = () => {
        setDisplay("block");
        setAuthType("signUp");
    }

    const closeDisplay = () => {
        setDisplay("none");
        setAuthType(null);
    }

  return (

    <div className="page">

      <NewAuthComponent display={display} closeDisplay={closeDisplay} authType={authType} changeAuthType={changeAuthType}/>
      <header>
        <NewNavBar
            display={display}
            openDisplaySignIn={openDisplaySignIn}
            openDisplaySignUp={openDisplaySignUp}
            closeDisplay={closeDisplay}
            authType={authType}
            changeAuthType={changeAuthType}
        />
      </header>
      <main className="startMain">
        <MainPageMain
            display={display}
            openDisplaySignIn={openDisplaySignIn}
            openDisplaySignUp={openDisplaySignUp}
            closeDisplay={closeDisplay}
            authType={authType}
            changeAuthType={changeAuthType}
        />
      </main>

    </div>


);
}
