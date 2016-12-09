import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import tableMiddleware from 'middlewares/table';
import modalMiddleware from 'middlewares/modal';
import rootReducer from 'reducers';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});

/**
 * configureStore for development
 * @param <Object> browserHistory
 * @return <Object> store
 */
export default (browserHistory) => {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);
    const createStoreWithMiddleware = applyMiddleware(
        reduxRouterMiddleware,
        thunkMiddleware,
        loggerMiddleware,
        tableMiddleware,
        modalMiddleware
    )(createStore);

    return createStoreWithMiddleware(rootReducer);
};