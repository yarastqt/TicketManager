import { createReducer } from '../utils';
import types from '../constants';

const initialState = {
    list: [],
    fetching: true,
    rowsPerPage: 25,
    sort: {
        key: 'id',
        desc: true
    },
    filters: {

    }
};

/**
 * Tasks reducer
 * @param <Object> initial state
 * @param <Object> actions
 * @return <Object> new state
 */
export default createReducer((state, payload) => ({
    [types.TASKS_REQUEST]() {
        return { ...state, fetching: true };
    },

    [types.TASKS_SUCCESS]() {
        return { ...state, list: payload, fetching: false };
    },

    [types.TASK_ADD_SUCCESS]() {
        return { ...state, list: [ ...state.list, payload ] };
    },

    [types.TASK_UPDATE_SUCCESS]() {
        const list = state.list.map((task) => {
            if (task.id === payload.id) {
                return Object.assign({}, task, payload);
            }

            return task;
        });

        return { ...state, list };
    },

    [types.TASK_REMOVE_SUCCESS]() {
        const list = state.list.filter((task) =>
            task.id !== parseInt(payload.id)
        );

        return { ...state, list };
    },

    [types.TOGGLE_TABLE_SORT]() {
        if (payload.tableName === 'tasks') {
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