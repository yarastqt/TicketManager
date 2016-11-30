import jwtDecode from 'jwt-decode';

import { PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from 'constants/profile';
import { http } from 'utils';
import { showNotification } from './notifications';

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