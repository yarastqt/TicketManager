import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import { http } from 'utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    };
}

export function login(data, redirectAfterLogin) {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        return http.post('/v1/auth/login', data).then((data) => {
            const user = jwtDecode(data);
            localStorage.setItem('token', data);
            dispatch(loginSuccess(user));
            dispatch(push(redirectAfterLogin));
        }).catch(({ errors }) => {
            const field = Object.keys(errors)[0];
            throw new SubmissionError({ [field]: errors[field] });
        });
    };
}

export function loadUserProfile() {
    return (dispatch, getState) => {
        const { session } = getState();

        if (!session.user) {
            try {
                const token = localStorage.getItem('token');
                const user = jwtDecode(token);
                const now = new Date().getTime() / 1000;

                if (user.exp < now) {
                    dispatch(logOut());
                } else {
                    dispatch(loginSuccess(user))
                }
            } catch (e) {
                dispatch(logOut());
            }
        }
    };
}

export function register(data) {
    return (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });

        return http.post('/v1/auth/register', data).then(() => {
            dispatch({ type: REGISTER_SUCCESS });
        }).catch(({ errors }) => {
            const field = Object.keys(errors)[0];
            throw new SubmissionError({ [field]: errors[field] });
        });
    };
}

export function logOut() {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch(push('/auth/login'));
    };
}