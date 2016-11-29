import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import types from 'constants';

import sidebar from './sidebar';
import session from './session';
import modal from './modal';
import notifications from './notifications';
import table from './table';
import tasks from './tasks';
import users from './users';
import tracks from './tracks';

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
    tracks
});

export default (state, action) => {
    if (action.type === types.LOGOUT_SUCCESS) {
        state = undefined;
    }

    return rootReducer(state, action);
};