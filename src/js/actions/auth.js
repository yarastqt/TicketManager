import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import { http } from 'utils';
import { showNotification } from './notifications';
import {
    LOGOUT_SUCCESS,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from 'constants/auth';

function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    };
}

function showNotify(message) {
    return (dispatch) => {
        dispatch(showNotification({ message }));
    };
}

export function login(data, redirectAfterLogin) {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        return http.post('/v1/auth/login', data)
            .then((data) => {
                const user = jwtDecode(data);
                localStorage.setItem('token', data);
                dispatch(loginSuccess(user));
                dispatch(push(redirectAfterLogin));
            })
            .catch((data) => {
                const field = Object.keys(data.errors)[0];
                throw new SubmissionError({ [field]: data.errors[field] });
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

function registerSuccess() {
    return (dispatch) => {
        dispatch({ type: REGISTER_SUCCESS });
        dispatch(showNotification({
            message: 'Регистрация прошла успешно. Ожидайте подтверждения администратора'
        }));
    };
}

export function register(data) {
    return (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });

        return http.post('/v1/auth/register', data).then(
            (data) => dispatch(registerSuccess()),
            (data) => {
                const field = Object.keys(data.errors)[0];
                throw new SubmissionError({ [field]: data.errors[field] });
            }
        );
    };
}

export function logOut() {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch(push('/auth/login'));
    };
}