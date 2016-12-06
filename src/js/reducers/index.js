import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { LOGOUT_SUCCESS } from 'constants/auth';

import sidebar from './sidebar';
import session from './session';
import modal from './modal';
import notifications from './notifications';
import table from './table';
import tasks from './tasks';
import users from './users';
import tracks from './tracks';
import filters from './filters';

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    sidebar,
    session,
    modal,
    notifications,
    table,
    tasks,
    users,
    tracks,
    filters
});

export default (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }

    return rootReducer(state, action);
};