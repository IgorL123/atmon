import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/list&desk.css'
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";

const unsubscribe = store.subscribe(() =>
    console.log('State:', store.getState())
)
unsubscribe()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);