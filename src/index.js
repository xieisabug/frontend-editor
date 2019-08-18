import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";

import './index.css';

import PageEditorIndex from './page-editor/PageEditorIndex';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./reducer/reducer"

function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}

ReactDOM.render(
    <Provider store={configureStore()}>
        <PageEditorIndex/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
