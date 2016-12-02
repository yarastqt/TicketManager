import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import { PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from 'constants/profile';
import { http } from 'utils';
import { showNotification } from './notifications';

export function updateProfile(data) {
    return (dispatch) => {
        dispatch({ type: PROFILE_UPDATE_REQUEST });

        return http.put('/v1/profile', data)
            .then((data) => {
                const user = jwtDecode(data);
                localStorage.setItem('token', data);

                dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: { user } });
                dispatch(showNotification({ message: 'Профиль обновлен' }));
            })
            .catch((data) => {
                const field = Object.keys(data.errors)[0];
                throw new SubmissionError({ [field]: data.errors[field] });
            });
    };
}