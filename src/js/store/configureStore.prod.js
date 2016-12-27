import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import { tableMiddleware, modalMiddleware, sidebarMiddleware } from 'middlewares';
import rootReducer from 'reducers/root';

// Remove react dev tools from google chrome extension
if (typeof (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) === 'object') {
    Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach((key) => {
        delete window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key];
    });
}

const middlewares = [
    thunkMiddleware,
    tableMiddleware,
    modalMiddleware,
    sidebarMiddleware
];

/**
 * configureStore for production
 * @param <Object> browserHistory
 * @return <Object> store
 */
export default (browserHistory, initialState) => {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);
    const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, ...middlewares)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);

    return store;
};