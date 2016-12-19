import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import debounce from 'lodash/debounce';

import { loadState, saveState } from 'utils/store';
import configureStore from 'store';
import configureRoutes from 'routes'

const persistedState = loadState();
const store = configureStore(browserHistory, persistedState);
const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(debounce(() => {
    const { session, sidebar } = store.getState();
    saveState({ session, sidebar });
}, 1000));

render((
    <Provider store={ store }>
        <Router onUpdate={ () => window.scrollTo(0, 0) } history={ history }>
            { configureRoutes() }
        </Router>
    </Provider>
), document.getElementById('react-root'));