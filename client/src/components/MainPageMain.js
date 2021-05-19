import React from 'react';
import {DiscoverFeatures} from '../components/discoverFeatures'


export const MainPageMain = ({openDisplaySignIn, openDisplaySignUp, display, closeDisplay, authType, changeAuthType}) => {

  return (

    <section className="mainSec">

      <h1>The Best Task Manager</h1>

        <p>
          This web application was made by students of MEPhI university as a project. The purpose was to create a web application
          of setting and accounting tasks. Yes, it does not look like a project which is made by professionals since we are not.
          However, we have done our best.
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