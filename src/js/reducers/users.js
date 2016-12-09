import { createReducer, updateObjectInArray, deleteObjectFromArray } from 'utils';
import { USERS_LOAD_REQUEST, USERS_LOAD_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_REMOVE_SUCCESS } from 'actions/users';

export default createReducer({
    [USERS_LOAD_REQUEST](state) {
        return {
            ...state, fetching: true
        };
    },

    [USERS_LOAD_SUCCESS](state, list) {
        return {
            ...state, list, fetching: false
        };
    },

    [USER_UPDATE_SUCCESS](state, user) {
        return {
            ...state, list: updateObjectInArray(state.list, 'id', user)
        };
    },

    [USER_REMOVE_SUCCESS](state, { id }) {
        return {
            ...state, list: deleteObjectFromArray(state.list, 'id', id)
        };
    }
}, {
    list: [],
    fetching: true
});