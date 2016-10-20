import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import { http } from '../utils';
import types from '../constants';
import { showNotification } from './notifications';

export function login(data, redirectAfterLogin) {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_REQUEST });
        http.post('/auth/login', data)
            .then((token) => {
                const user = jwtDecode(token);
                localStorage.setItem('token', token);
                dispatch(loginSuccess(user));
                dispatch(push(redirectAfterLogin));
            })
            .catch((error) => {
                error.response.json().then((error) => {
                    dispatch(showNotification({
                        message: error.message
                    }));
                });
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
        http.post('/auth/register', data)
            .then((data) => {
                console.log('obj');
                dispatch(showNotification({
                    message: 'Регистрация прошла успешно. Ожидайте подтверждения администратора'
                }));
            })
            .catch((error) => {
                error.response.json().then((error) => {
                    dispatch(showNotification({
                        message: error.message
                    }));
                });
            });
    };
}

export function logOut() {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: types.LOGOUT_SUCCESS });
        dispatch(push('/auth/login'));
    };
}

function loginSuccess(user) {
    return {
        type: types.LOGIN_SUCCES,
        payload: {
            user
        }
    };
}