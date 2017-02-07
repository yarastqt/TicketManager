import { createReducer, updateObjectInArray, deleteObjectFromArray } from 'utils';
import { TRACKS_LOAD_REQUEST, TRACKS_LOAD_SUCCESS, TRACK_ADD_REQUEST, TRACK_ADD_SUCCESS, TRACK_DELETE_REQUEST, TRACK_DELETE_SUCCESS, TRACK_UPDATE_REQUEST, TRACK_UPDATE_SUCCESS } from 'actions/tracks';

export default createReducer({
    [TRACKS_LOAD_REQUEST](state) {
        return { ...state, fetching: true };
    },

    [TRACKS_LOAD_SUCCESS](state, payload) {
        return { ...state, list: payload, fetching: false };
    },

    [TRACK_ADD_SUCCESS](state, payload) {
        return { ...state, list: [...state.list, payload] };
    },

    [TRACK_UPDATE_SUCCESS](state, payload) {
        return { ...state, list: updateObjectInArray(state.list, 'id', payload) };
    },

    [TRACK_DELETE_SUCCESS](state, { id }) {
        return { ...state, list: deleteObjectFromArray(state.list, 'id', parseInt(id)) };
    }
}, {
    fetching: true, list: []
});
