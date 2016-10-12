import types from '../constants';

export function getAllUsers() {
    return (dispatch, getState) => {
        const { users } = getState();

        if (!users.list.length) {
            return dispatch(fetchUsers());
        }
    };
}

export function updateUser(id, data) {
    return {
        type: 'USER_UPDATE',
        $payload: {
            request: {
                url: `/users/${id}`,
                method: 'put',
                body: data
            },
            notification: {
                message: 'Профиль пользователя обновлен'
            }
        }
    };
}

export function removeUser(id) {
    return {
        type: 'USER_REMOVE',
        $payload: {
            request: {
                url: `/users/${id}`,
                method: 'delete'
            },
            notification: {
                message: 'Пользователь удален'
            }
        }
    };
}

function fetchUsers() {
    return {
        type: 'USERS',
        $payload: {
            request: {
                url: '/users',
                method: 'get'
            }
        }
    };
}