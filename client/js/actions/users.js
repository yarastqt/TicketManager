import types from 'constants';
import { http } from 'utils';
import { hideModal } from './modal';
import { showNotification } from './notifications';

const {
    USERS_REQUEST,
    USERS_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS
} = types;

function fetchUsers() {
    return (dispatch) => {
        dispatch({ type: USERS_REQUEST });

        return http.get('/v1/users').then(
            (payload) => dispatch({ type: USERS_SUCCESS, payload })
        );
    };
}

export function getAllUsers() {
    return (dispatch, getState) => {
        const { users } = getState();

        if (!users.list.length) {
            return dispatch(fetchUsers());
        }
    };
}

function updateUserSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: USER_UPDATE_SUCCESS, payload });
        dispatch(showNotification({ message: 'Профиль пользователя обновлен' }));
        dispatch(hideModal());
    };
}

export function updateUser(id, data) {
    return (dispatch) => {
        dispatch({ type: USER_UPDATE_REQUEST });

        return http.put(`/v1/users/${id}`, data).then(
            (payload) => dispatch(updateUserSuccess(payload))
        );
    };
}

function removeUserSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: USER_REMOVE_SUCCESS, payload });
        dispatch(showNotification({ message: 'Пользователь удален' }));
    };
}

export function removeUser(id) {
    return (dispatch) => {
        dispatch({ type: USER_REMOVE_REQUEST });

        return http.delete(`/v1/users/${id}`).then(
            (payload) => dispatch(removeUserSuccess(payload))
        );
    };
}