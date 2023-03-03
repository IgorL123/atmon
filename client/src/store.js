import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import Cookies from 'js-cookie';


let isAuth, isSuper;
isAuth = !!Cookies.get('token');
isSuper = Cookies.get('superuser');

const InitialState = {auth:{
    isAuthenticated: isAuth,
    isSuperUser : isSuper,
        time : Cookies.get('time')
    }}

const checkAuthMiddleware = storeAPI => next => action => {
    if (new Date() - storeAPI.getState().auth.time >= 120000){
        //storeAPI.getState().auth.isAuthenticated = false
    } else{
        //storeAPI.getState().auth.time = new Date()
    }
    let result = next(action)
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
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(alwaysReturnHelloMiddleware)
})




