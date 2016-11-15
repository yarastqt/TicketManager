import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import types from 'constants';

import sidebar from './sidebar';
import session from './session';
import modal from './modal';
import notifications from './notifications';
import table from './table';
import tasks from './tasks';
import users from './users';

const appReducer = combineReducers({
    routing: routerReducer,
    sidebar,
    session,
    modal,
    notifications,
    table,
    tasks,
    users
});

export default (state, action) => {
    if (action.type === types.LOGOUT_SUCCESS) {
        state = undefined;
    }

    return appReducer(state, action);
};