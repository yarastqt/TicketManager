import { SubmissionError } from 'redux-form';

import { http, normalizeErrors } from 'utils';
import { hideModal } from './modal';
import { pushToast } from './toast';

export const TRACKS_LOAD_REQUEST = 'TRACKS_LOAD_REQUEST';
export const TRACKS_LOAD_SUCCESS = 'TRACKS_LOAD_SUCCESS';
export const TRACKS_LOAD_FAILURE = 'TRACKS_LOAD_FAILURE';

export function getTracks() {
    return (dispatch, getState) => {
        const { tracks } = getState();

        if (!tracks.list.length) {
            dispatch({ type: TRACKS_LOAD_REQUEST });

            return http.get('/v1/tracks').then((payload) => {
                dispatch({ type: TRACKS_LOAD_SUCCESS, payload });
            }).catch((error) => {
                dispatch({ type: TRACKS_LOAD_FAILURE });
            });
        }
    };
}

export const TRACK_ADD_REQUEST = 'TRACK_ADD_REQUEST';
export const TRACK_ADD_SUCCESS = 'TRACK_ADD_SUCCESS';
export const TRACK_ADD_FAILURE = 'TRACK_ADD_FAILURE';

export function addTrack(track) {
    return (dispatch) => {
        dispatch({ type: TRACK_ADD_REQUEST });

        return http.post('/v1/tracks', track).then((payload) => {
            dispatch({ type: TRACK_ADD_SUCCESS, payload });
            dispatch(pushToast('Сайт добавлен'));
        }).catch((errors) => {
            dispatch({ type: TRACK_ADD_FAILURE });
            throw new SubmissionError(normalizeErrors(errors));
        });
    };
}

export const TRACK_UPDATE_REQUEST = 'TRACK_UPDATE_REQUEST';
export const TRACK_UPDATE_SUCCESS = 'TRACK_UPDATE_SUCCESS';
export const TRACK_UPDATE_FAILURE = 'TRACK_UPDATE_FAILURE';

export function updateTrack(track) {
    return (dispatch) => {
        dispatch({ type: TRACK_UPDATE_REQUEST });

        return http.put(`/v1/tracks/${track.id}`, track).then((payload) => {
            dispatch({ type: TRACK_UPDATE_SUCCESS, payload });
            dispatch(pushToast('Сайт обновлен'));
        }).catch((errors) => {
            dispatch({ type: TRACK_UPDATE_FAILURE });
            throw new SubmissionError(normalizeErrors(errors));
        });;
    };
}

export const TRACK_DELETE_REQUEST = 'TRACK_DELETE_REQUEST';
export const TRACK_DELETE_SUCCESS = 'TRACK_DELETE_SUCCESS';
export const TRACK_DELETE_FAILURE = 'TRACK_DELETE_FAILURE';

export function deleteTrack(trackId) {
    return (dispatch) => {
        dispatch({ type: TRACK_DELETE_REQUEST });

        return http.delete(`/v1/tracks/${trackId}`).then((payload) => {
            dispatch({ type: TRACK_DELETE_SUCCESS, payload });
            dispatch(pushToast('Сайт удален'));
        });
    };
}
