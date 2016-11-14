import { createReducer } from '../utils';
import types from '../constants';

const {
    USERS_REQUEST,
    USERS_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_REMOVE_SUCCESS
} = types;

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
        const list = state.list.map((user) => {
            if (user.id === payload.id) {
                return Object.assign({}, user, payload);
            }

            return user;
        });

        return { ...state, list };
    },

    [USER_REMOVE_SUCCESS]() {
        const list = state.list.filter((user) =>
            user.id !== payload.id
        );

        return { ...state, list: list };
    }
}), initialState);