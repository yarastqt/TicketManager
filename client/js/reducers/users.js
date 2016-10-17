import { createReducer } from '../utils';
import types from '../constants';

const initialState = {
    list: [],
    fetching: true
};

export default createReducer((state, payload) => ({
    [types.USERS_REQUEST]() {
        return { ...state, fetching: true };
    },

    [types.USERS_SUCCESS]() {
        return { ...state, list: payload, fetching: false };
    },

    [types.USER_UPDATE_SUCCESS]() {
        const list = state.list.map((user) => {
            if (user.id === payload.id) {
                return Object.assign({}, user, payload);
            }

            return user;
        });

        return { ...state, list };
    },

    [types.USER_REMOVE_SUCCESS]() {
        const list = state.list.filter((user) =>
            user.id !== payload.id
        );

        return { ...state, list: list };
    }
}), initialState);