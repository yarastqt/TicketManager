import jwtDecode from 'jwt-decode';

import types from 'constants';
import { http } from 'utils';
import { showNotification } from './notifications';

const {
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS
} = types;

function updateProfileSuccess(user) {
    return (dispatch) => {
        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: { user } });
        dispatch(showNotification({ message: 'Профиль обновлен' }));
    };
}

export function updateProfile(data) {
    return (dispatch) => {
        dispatch({ type: PROFILE_UPDATE_REQUEST });

        return http.put('/v1/profile', data).then(
            (data) => {
                const user = jwtDecode(data);
                localStorage.setItem('token', data);
                dispatch(updateProfileSuccess(user));
            }
        );
    };
}