import { http } from 'utils';
import { hideModal } from './modal';
import { showNotification } from './notifications';
import {
    TRACKS_LOAD_REQUEST, TRACKS_LOAD_SUCCESS,
    TRACK_ADD_REQUEST, TRACK_ADD_SUCCESS,
    TRACK_DELETE_REQUEST, TRACK_DELETE_SUCCESS,
    TRACK_UPDATE_REQUEST, TRACK_UPDATE_SUCCESS
} from 'constants/tracks';

export function getTracks() {
    return (dispatch, getState) => {
        const { tracks } = getState();

        if (!tracks.list.length) {
            dispatch({ type: TRACKS_LOAD_REQUEST });

            return http.get('/v1/tracks').then((payload) => {
                dispatch({ type: TRACKS_LOAD_SUCCESS, payload }); 
            });
        }
    };
}

export function addTrack(track) {
    return (dispatch) => {
        dispatch({ type: TRACK_ADD_REQUEST });

        return http.post('/v1/tracks', track).then((payload) => {
            dispatch({ type: TRACK_ADD_SUCCESS, payload });
            dispatch(showNotification({ message: 'Сайт добавлен' }));
        });
    };
}

export function deleteTrack(trackId) {
    return (dispatch) => {
        dispatch({ type: TRACK_DELETE_REQUEST });

        return http.delete(`/v1/tracks/${trackId}`).then((payload) => {
            dispatch({ type: TRACK_DELETE_SUCCESS, payload });
            dispatch(showNotification({ message: 'Сайт удален' }));
        });
    };
}

export function updateTrack(track) {
    return (dispatch) => {
        dispatch({ type: TRACK_UPDATE_REQUEST });

        return http.put(`/v1/tracks/${track.id}`, track).then((payload) => {
            dispatch({ type: TRACK_UPDATE_SUCCESS, payload });
            dispatch(showNotification({ message: 'Сайт обновлен' }));
        });
    };
}