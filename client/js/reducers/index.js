import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sidebar from './sidebar';
import session from './session';
import modal from './modal';
import notifications from './notifications';
import table from './table';
import tasks from './tasks';
import users from './users';

const rootReducer = combineReducers({
    routing: routerReducer,
    sidebar,
    session,
    modal,
    notifications,
    table,
    tasks,
    users
});

export default rootReducer;