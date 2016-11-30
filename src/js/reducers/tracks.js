import { createReducer, updateObjectInArray, deleteObjectFromArray } from 'utils';
import {
    TRACKS_LOAD_REQUEST, TRACKS_LOAD_SUCCESS,
    TRACK_ADD_REQUEST, TRACK_ADD_SUCCESS,
    TRACK_DELETE_REQUEST, TRACK_DELETE_SUCCESS,
    TRACK_UPDATE_REQUEST, TRACK_UPDATE_SUCCESS
} from 'constants/tracks';

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
        const list = deleteObjectFromArray(
            state.list, 'id', parseInt(payload.id)
        );

        return { ...state, list };
    },

    [TRACK_UPDATE_SUCCESS]() {
        const list = updateObjectInArray(
            state.list, 'id', payload
        );

        return { ...state, list };
    }
}), initialState);