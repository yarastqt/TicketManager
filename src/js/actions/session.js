import JWTDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import { http, normalizeErrors } from 'utils';

function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(data, redirectAfterLogin) {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        return http.post('/v1/auth/login', data).then((data) => {
            const user = JWTDecode(data);
            localStorage.setItem('token', data);

            dispatch(loginSuccess(user));
            dispatch(push(redirectAfterLogin));
        }).catch((errors) => {
            throw new SubmissionError(normalizeErrors(errors));
        });
    };
}

export function checkUserExpires() {
    return (dispatch, getState) => {
        const { session } = getState();
        const now = new Date().getTime() / 1000;

        if (session.user.exp < now) {
            dispatch(logout());
        }
    };
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function register(data) {
    return (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });

        return http.post('/v1/auth/register', data).then(() => {
            dispatch({ type: REGISTER_SUCCESS });
        }).catch((errors) => {
            throw new SubmissionError(normalizeErrors(errors));
        });
    };
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function logout() {
    return (dispatch) => {
        localStorage.removeItem('token');

        dispatch({ type: LOGOUT_SUCCESS });
        dispatch(push('/auth/login'));
    };
}
