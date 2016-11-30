import { createReducer } from 'utils';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from 'constants/auth';
import { PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILURE } from 'constants/profile';

const initialState = {
    authenticated: localStorage.getItem('token') ? true : false,
    user: null
};

export default createReducer((state, payload) => ({
    [LOGIN_REQUEST]() {
        return { authenticated: false, user: null };
    },

    [PROFILE_UPDATE_SUCCESS]() {
        return { authenticated: true, user: payload.user };
    },

    [LOGIN_SUCCESS]() {
        return { authenticated: true, user: payload.user };
    },

    [LOGOUT_SUCCESS]() {
        return { authenticated: false, user: null };
    }
}), initialState);