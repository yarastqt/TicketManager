import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import { http, normalizeErrors } from 'utils';
import { pushToast } from 'actions/toast';

export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';

export function updateProfile(data) {
    return (dispatch) => {
        dispatch({ type: PROFILE_UPDATE_REQUEST });

        return http.put('/v1/profile', data)
            .then((data) => {
                const user = jwtDecode(data);
                localStorage.setItem('token', data);

                dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: { user } });
                dispatch(pushToast('Профиль обновлен'));
            })
            .catch((errors) => {
                dispatch({ type: PROFILE_UPDATE_FAILURE });
                throw new SubmissionError(normalizeErrors(errors));
            });
    };
}
