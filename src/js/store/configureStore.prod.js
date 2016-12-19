import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import tableMiddleware from 'middlewares/table';
import modalMiddleware from 'middlewares/modal';
import rootReducer from 'reducers/root';

// Remove react dev tools from google chrome extension
if (typeof (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) === 'object') {
    Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach((key) => {
        delete window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key];
    });
}

/**
 * configureStore for production
 * @param <Object> browserHistory
 * @return <Object> store
 */
export default (browserHistory, initialState) => {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);
    const createStoreWithMiddleware = applyMiddleware(
        reduxRouterMiddleware,
        thunkMiddleware,
        tableMiddleware,
        modalMiddleware
    )(createStore);

    return createStoreWithMiddleware(rootReducer, initialState);
};