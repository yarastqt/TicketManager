import { createReducer } from 'utils';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from 'actions/session';
import { PROFILE_UPDATE_SUCCESS } from 'actions/profile';

export default createReducer({
    [LOGIN_REQUEST]() {
        return { authenticated: false, user: null };
    },

    [LOGOUT_SUCCESS]() {
        return { authenticated: false, user: {} };
    },

    [LOGIN_SUCCESS](state, { user }) {
        return { authenticated: true, user };
    },

    [PROFILE_UPDATE_SUCCESS](state, { user }) {
        return { authenticated: true, user };
    }
}, {
    authenticated: false, user: null
});
