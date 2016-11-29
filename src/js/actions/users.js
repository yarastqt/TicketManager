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

export function getUsers() {
    return (dispatch, getState) => {
        const { users } = getState();

        if (!users.list.length) {
            dispatch({ type: USERS_REQUEST });

            return http.get('/v1/users').then((payload) => {
                dispatch({ type: USERS_SUCCESS, payload });
            });
        }
    };
}

export function updateUser(user) {
    return (dispatch) => {
        dispatch({ type: USER_UPDATE_REQUEST });

        return http.put(`/v1/users/${user.id}`, user).then((payload) => {
            dispatch({ type: USER_UPDATE_SUCCESS, payload });
            dispatch(showNotification({ message: 'Профиль пользователя обновлен' }));
        });
    };
}

export function removeUser(userId) {
    return (dispatch) => {
        dispatch({ type: USER_REMOVE_REQUEST });

        return http.delete(`/v1/users/${userId}`).then((payload) => {
            dispatch({ type: USER_REMOVE_SUCCESS, payload });
            dispatch(showNotification({ message: 'Пользователь удален' }));
        });
    };
}