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
      <footer>
        <span>Developers</span>
        <div className="wrap">
          <ul className="contacts">
            <li className="cont">
              <a href="https://vk.com/kraev.yura" target="_blank">
                <span>Kraev Yurii</span>
                <img src="https://img-premium.flaticon.com/png/512/246/246156.png?token=exp=1621461976~hmac=c4bcd821a052b785f8d365c6dd50ba98" alt=""/>
              </a>
            </li>
            <li className="cont">
              <a href="https://vk.com/id245982135" target="_blank">
                <span>Latypov Igor</span>
                <img src="https://img-premium.flaticon.com/png/512/246/246156.png?token=exp=1621461976~hmac=c4bcd821a052b785f8d365c6dd50ba98" alt=""/>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>


);
}
