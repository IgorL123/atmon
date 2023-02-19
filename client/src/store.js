import { createStore, applyMiddleware} from 'redux'
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducer";

import Cookies from 'js-cookie';

let isAuth;
isAuth = !!Cookies.get('token');

const InitialState = {auth:{
    isAuthenticated: isAuth,
    }}

const checkAuthMiddleware = storeAPI => next => action => {
    let result = next(action)
    //console.log(store.getState())
    //console.log("Checking auth....")
    return result
}

const loggerMiddleware = storeAPI => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    return result
}


const reduxThunkMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    return next(action)
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: InitialState,
    middleware: [checkAuthMiddleware, reduxThunkMiddleware],
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(alwaysReturnHelloMiddleware),

})




