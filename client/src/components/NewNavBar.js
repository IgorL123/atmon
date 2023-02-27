import React from 'react';

export const NewNavBar = ({openDisplaySignIn, openDisplaySignUp, display, closeDisplay, authType, changeAuthType}) => {
// export const NewNavBar = () => {


  return (
    <nav className="NewNavBar">

      <div className="logo">
        <span>ATM</span>
      </div>

      <ul>
        <li><button className="SignIn" onClick={openDisplaySignIn}>Sign In</button></li>
        <li><button className="SignUp" onClick={openDisplaySignUp}>Sign Up</button></li>
      </ul>


    </nav>
  );

}