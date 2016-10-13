import { createReducer } from '../utils';
import types from '../constants';

const initialState = {
    list: [],
    fetching: true,
    rowsPerPage: 10,
    sort: {
        key: 'blocked',
        desc: false
    },
    filters: {

    }
};

/**
 * Users reducer
 * @param <Object> initial state
 * @param <Object> actions
 * @return <Object> new state
 */
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
    },

    [types.TOGGLE_TABLE_SORT]() {
        if (payload.tableName === 'users') {
            if (payload.sortKey === state.sort.key) {
                return { ...state, sort: { ...state.sort, desc: !state.sort.desc } };
            }

            return { ...state, sort: { key: payload.sortKey, desc: false } };
        }

        return state;
    },

    [types.CHANGE_TABLE_ROWS]() {
        return { ...state, rowsPerPage: payload.rowsPerPage };
    }
}), initialState);