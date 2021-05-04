import React, {Fragment} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {Loader} from "./components/Loader";
import {MainPage} from "./pages/MainPage";
import {CreatePage} from "./pages/CreatePage";
import {NewNavBar} from "./components/NewNavBar";
import {useSelector} from "react-redux";
import {FormNewTask} from "./components/Form";
import {ListTasks} from "./components/List";



function App() {
    const {ready} = useAuth()
    const state = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.isLoading)

    if (!ready) {
        return <Loader />
    }

    if(state && !loading){
        return (
            <Fragment>
            <Router>
            <Switch>
                <Route path="/create" exact component={CreatePage}>
                    <CreatePage />
                </Route>
                <Route path="/create" component={FormNewTask}> </Route>
                <Route path="/create" component={ListTasks}> </Route>
                <Redirect to="/create" />
            </Switch>
            </Router>
            </Fragment>
        )}


  return (
      <Fragment>
      <Router>
          <Switch>
      <Fragment className="app">
          <Route exact path="/" component={MainPage} />
                <MainPage/>
          <Route/>

          <Redirect to="/"/>
      </Fragment>
          </Switch>
      </Router>
      </Fragment>
  )
}

export default App
