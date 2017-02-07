import { SubmissionError } from 'redux-form';

import { http, normalizeErrors } from 'utils';
import { hideModal } from './modal';
import { pushToast } from './toast';

export const USERS_LOAD_REQUEST = 'USERS_LOAD_REQUEST';
export const USERS_LOAD_SUCCESS = 'USERS_LOAD_SUCCESS';
export const USERS_LOAD_FAILURE = 'USERS_LOAD_FAILURE';

export function getUsers() {
    return (dispatch, getState) => {
        const { users } = getState();

        if (!users.list.length) {
            dispatch({ type: USERS_LOAD_REQUEST });

            return http.get('/v1/users').then((payload) => {
                dispatch({ type: USERS_LOAD_SUCCESS, payload });
            }).catch((error) => {
                dispatch({ type: USERS_LOAD_FAILURE });
            });
        }
    };
}

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

export function updateUser(user) {
    return (dispatch) => {
        dispatch({ type: USER_UPDATE_REQUEST });

        return http.put(`/v1/users/${user.id}`, user).then((payload) => {
            dispatch({ type: USER_UPDATE_SUCCESS, payload });
            dispatch(pushToast('Профиль пользователя обновлен'));
        }).catch((errors) => {
            dispatch({ type: USER_UPDATE_FAILURE });
            throw new SubmissionError(normalizeErrors(errors));
        });
    };
}

export const USER_REMOVE_REQUEST = 'USER_REMOVE_REQUEST';
export const USER_REMOVE_SUCCESS = 'USER_REMOVE_SUCCESS';
export const USER_REMOVE_FAILURE = 'USER_REMOVE_FAILURE';

export function removeUser(userId) {
    return (dispatch) => {
        dispatch({ type: USER_REMOVE_REQUEST });

        return http.delete(`/v1/users/${userId}`).then((payload) => {
            dispatch({ type: USER_REMOVE_SUCCESS, payload });
            dispatch(pushToast('Пользователь удален'));
        });
    };
}
