import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureStore from './store/';
import configureRoutes from './routes/'

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render((
    <Provider store={ store }>
        <Router onUpdate={ () => window.scrollTo(0, 0) } history={ history }>{ configureRoutes(store) }</Router>
    </Provider>
), document.getElementById('react-root'));