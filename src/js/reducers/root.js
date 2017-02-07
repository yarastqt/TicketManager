import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { LOGOUT_SUCCESS } from 'actions/session';

import sidebar from './sidebar';
import session from './session';
import modal from './modal';
import toast from './toast';
import table from './table';
import tickets from './tickets';
import users from './users';
import tracks from './tracks';
import filters from './filters';

const rootReducer = combineReducers({
    routing: routerReducer, form: formReducer,
    sidebar, session, modal, toast, table, tickets, users, tracks, filters
});

export default (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = { sidebar: state.sidebar };
    }

    return rootReducer(state, action);
};
