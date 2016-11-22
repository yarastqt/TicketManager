import types from 'constants';
import { http } from 'utils';
import { hideModal } from './modal';
import { showNotification } from './notifications';

const {
    TRACKS_LOAD_REQUEST,
    TRACKS_LOAD_SUCCESS,
    TRACK_ADD_REQUEST,
    TRACK_ADD_SUCCESS,
    TRACK_DELETE_REQUEST,
    TRACK_DELETE_SUCCESS,
    TRACK_UPDATE_REQUEST,
    TRACK_UPDATE_SUCCESS
} = types;


function fetchTracks() {
    return (dispatch) => {
        dispatch({ type: TRACKS_LOAD_REQUEST });

        return http.get('/v1/tracks').then(
            (payload) => dispatch({ type: TRACKS_LOAD_SUCCESS, payload }),
            () => dispatch(showNotification({ message: 'Возникла ошибка при загрузке данных' }))
        );
    };
}

export function getTracks() {
    return (dispatch, getState) => {
        const { tracks } = getState();

        if (!tracks.list.length) {
            return dispatch(fetchTracks());
        }
    };
}

function addTrackSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: TRACK_ADD_SUCCESS, payload });
        dispatch(showNotification({ message: 'Сайт добавлен' }));
        dispatch(hideModal());
    };
}

export function addTrack(data) {
    return (dispatch) => {
        dispatch({ type: TRACK_ADD_REQUEST });

        return http.post('/v1/tracks', data).then(
            (payload) => dispatch(addTrackSuccess(payload))
        );
    };
}

function deleteTrackSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: TRACK_DELETE_SUCCESS, payload });
        dispatch(showNotification({ message: 'Сайт удален' }));
    };
}

export function deleteTrack(trackId) {
    return (dispatch) => {
        dispatch({ type: TRACK_DELETE_REQUEST });

        return http.delete(`/v1/tracks/${trackId}`).then(
            (payload) => dispatch(deleteTrackSuccess(payload))
        );
    };
}

function updateTrackSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: TRACK_UPDATE_SUCCESS, payload });
        dispatch(showNotification({ message: 'Сайт обновлен' }));
        dispatch(hideModal());
    };
}

export function updateTrack(trackId, data) {
    return (dispatch) => {
        dispatch({ type: TRACK_UPDATE_REQUEST });

        return http.put(`/v1/tracks/${trackId}`, data).then(
            (payload) => dispatch(updateTrackSuccess(payload))
        );
    };
}