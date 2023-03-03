import React, {Fragment} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook"
import 'materialize-css'
import {Loader} from "./components/Loader"
import {MainPage} from "./pages/MainPage"
import {CreatePage} from "./pages/CreatePage"
import {useSelector} from "react-redux"
import {UsersPage} from "./pages/UsersPage";
import {InfoPage} from "./pages/InfoPage";
import Cookies from "js-cookie";
import {ClientPage} from "./pages/ClientPage";

function App() {
    const {ready} = useAuth()
    const state = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.isLoading)
    let s = Cookies.get('superuser')
    s = s === "true";

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
                        <Route path="/info" exact component={InfoPage}>
                            <InfoPage />
                        </Route>
                        {s &&
                            <Route path="/users" exact component={UsersPage}>
                                <UsersPage />
                            </Route>
                        }
                        <Route path="/clients" exact component={ClientPage}>
                            <ClientPage/>
                        </Route>
                        <Redirect to="/info" />
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
