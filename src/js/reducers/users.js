import { createReducer, updateObjectInArray, deleteObjectFromArray } from 'utils';
import {
    USERS_REQUEST, USERS_SUCCESS,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS,
    USER_REMOVE_SUCCESS
} from 'constants/users';

const initialState = {
    list: [],
    fetching: true
};

export default createReducer((state, payload) => ({
    [USERS_REQUEST]() {
        return { ...state, fetching: true };
    },

    [USERS_SUCCESS]() {
        return { ...state, list: payload, fetching: false };
    },

    [USER_UPDATE_SUCCESS]() {
        const list = updateObjectInArray(
            state.list, 'id', payload
        );

        return { ...state, list };
    },

    [USER_REMOVE_SUCCESS]() {
        const list = deleteObjectFromArray(
            state.list, 'id', payload.id
        );

        return { ...state, list };
    }
}), initialState);