import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { tableMiddleware, modalMiddleware, sidebarMiddleware } from 'middlewares';
import rootReducer from 'reducers/root';

const loggerMiddleware = createLogger({
    level: 'info', collapsed: true
});

const middlewares = [
    thunkMiddleware,
    loggerMiddleware,
    tableMiddleware,
    modalMiddleware,
    sidebarMiddleware
];

/**
 * configureStore for development
 * @param <Object> browserHistory
 * @return <Object> store
 */
export default (browserHistory, initialState) => {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);
    const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, ...middlewares)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState, window.devToolsExtension());

    if (module.hot) {
        module.hot.accept('reducers/root', () => {
            const { default: nextRootReducer } = require('reducers/root');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};