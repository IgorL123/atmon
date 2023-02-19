import React from 'react';
import {DiscoverFeatures} from './discoverFeatures'


export const MainPageMain = ({openDisplaySignIn, openDisplaySignUp, display, closeDisplay, authType, changeAuthType}) => {

  return (

    <section className="mainSec">

      <h1>ATM Monitoring</h1>

        <p>
          This web application was made by student of MEPhI university as a project. The purpose was to create a web application
          of monitoring atms
        </p>

      <ul className="links">
        <li><button className="getStarted"
                    onClick={openDisplaySignUp}
        >Get Started</button></li>
        <li><a href="#discoverfeatures">Discover Features</a></li>
      </ul>

    <DiscoverFeatures />
    </section>


  );

}