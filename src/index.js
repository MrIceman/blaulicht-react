import 'antd/dist/antd.css';
import './global.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as serviceWorker from './serviceWorker';

import { Dashboard } from './app/components/Homescreen/Dashboard';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Dashboard />
    </Provider>, 
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
