import { createReducer } from 'utils';
import types from 'constants';

const {
    TRACKS_LOAD_REQUEST,
    TRACKS_LOAD_SUCCESS,
    TRACK_ADD_REQUEST,
    TRACK_ADD_SUCCESS,
    TRACK_DELETE_SUCCESS,
    TRACK_UPDATE_REQUEST,
    TRACK_UPDATE_SUCCESS
} = types;

const initialState = {
    list: [],
    fetching: true
};

export default createReducer((state, payload) => ({
    [TRACKS_LOAD_REQUEST]() {
        return { ...state, fetching: true };
    },

    [TRACKS_LOAD_SUCCESS]() {
        return { ...state, list: payload, fetching: false };
    },

    [TRACK_ADD_SUCCESS]() {
        return { ...state, list: [ ...state.list, payload ] };
    },

    [TRACK_DELETE_SUCCESS]() {
        const list = state.list.filter(
            (track) => track.id !== parseInt(payload.id)
        );

        return { ...state, list: list };
    },

    [TRACK_UPDATE_SUCCESS]() {
        const list = state.list.map((track) =>
            track.id === payload.id ? { ...track, ...payload } : track
        );

        return { ...state, list };
    }
}), initialState);