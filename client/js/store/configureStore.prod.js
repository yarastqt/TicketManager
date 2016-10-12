import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import apiMiddleware from '../middleware/api';
import rootReducer from '../reducers';

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
export default (browserHistory) => {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);
    const createStoreWithMiddleware = applyMiddleware(
        reduxRouterMiddleware,
        thunkMiddleware,
        apiMiddleware
    )(createStore);

    return createStoreWithMiddleware(rootReducer);
};