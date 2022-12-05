import "core-js/stable"
import "regenerator-runtime/runtime"
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from 'store/index'

import App from './App'


ReactDOM.render(
    <Provider store={store}>
        <React.Suspense fallback="">
            <Router>
                <App />
            </Router>
        </React.Suspense>
    </Provider>,
    document.getElementById("app")
)