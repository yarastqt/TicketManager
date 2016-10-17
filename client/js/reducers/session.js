import { createReducer } from '../utils';
import types from '../constants';

const initialState = {
    authenticated: localStorage.getItem('token') ? true : false,
    user: null
};

export default createReducer((state, payload) => ({
    [types.LOGIN_REQUEST]() {
        return { authenticated: false, user: null };
    },

    [types.LOGIN_SUCCES]() {
        return { authenticated: true, user: payload.user };
    },

    [types.LOGOUT_SUCCESS]() {
        return { authenticated: false, user: null };
    }
}), initialState);