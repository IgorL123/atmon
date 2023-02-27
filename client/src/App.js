import React, {Fragment} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook"
import 'materialize-css'
import {Loader} from "./components/Loader"
import {MainPage} from "./pages/MainPage"
import {CreatePage} from "./pages/CreatePage"
import {useSelector} from "react-redux"
import {UsersPage} from "./pages/UsersPage";

function App() {
    const {ready} = useAuth()
    const state = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.isLoading)
    const sup = useSelector(state => state.auth.isSuperUser)

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
                        {sup &&
                            <Route path="/users" component={UsersPage}>
                                <UsersPage/>
                            </Route>
                        }
                <Redirect to="/create" />
            </Switch>
            </Router>
            </Fragment>
        )}


  return (
      <Fragment>
        <Router>
          <Switch>
            <Fragment>
                <Route exact path="/" component={MainPage} />
                <Redirect to="/"/>
            </Fragment>
          </Switch>
        </Router>
      </Fragment>
  )
}

export default App
