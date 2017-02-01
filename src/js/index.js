import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import { loadState, persistStore } from 'utils/store';
import configureStore from 'store';
import configureRoutes from 'routes';

const persistedState = loadState();
const store = configureStore(browserHistory, persistedState);
const history = syncHistoryWithStore(browserHistory, store);

persistStore(store, {
    whiteList: ['session', 'sidebar']
});

render((
    <Provider store={ store }>
        <Router onUpdate={ () => window.scrollTo(0, 0) } history={ history }>
            { configureRoutes() }
        </Router>
    </Provider>
), document.getElementById('react-root'));
