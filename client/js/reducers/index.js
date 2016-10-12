import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sidebar from './sidebar';
import session from './session';
import modal from './modal';
import notifications from './notifications';
import tasks from './tasks';
import users from './users';

// rootReducer
export default combineReducers({
    routing: routerReducer,
    sidebar,
    session,
    modal,
    notifications,
    tasks,
    users
});