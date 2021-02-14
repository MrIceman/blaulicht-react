import { applyMiddleware, compose, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import { reducer } from './app/reducer';

export const configureStore = () => {
    const middlewares = [];

    let composeEnhancers = compose;
    // debug extras
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(createLogger());
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    return createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );
};
