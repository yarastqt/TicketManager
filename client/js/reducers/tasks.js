import { createReducer } from '../utils';
import types from '../constants';

const {
    TASKS_REQUEST,
    TASKS_SUCCESS,
    TASK_ADD_SUCCESS,
    TASK_UPDATE_SUCCESS,
    TASK_REMOVE_SUCCESS
} = types;

const initialState = {
    list: [],
    fetching: true
};

export default createReducer((state, payload) => ({
    [TASKS_REQUEST]() {
        return { ...state, fetching: true };
    },

    [TASKS_SUCCESS]() {
        return { ...state, list: payload, fetching: false };
    },

    [TASK_ADD_SUCCESS]() {
        return { ...state, list: [ ...state.list, payload ] };
    },

    [TASK_UPDATE_SUCCESS]() {
        const list = state.list.map((task) => {
            if (task.id === payload.id) {
                return Object.assign({}, task, payload);
            }

            return task;
        });

        return { ...state, list };
    },

    [TASK_REMOVE_SUCCESS]() {
        const list = state.list.filter((task) =>
            task.id !== parseInt(payload.id)
        );

        return { ...state, list };
    }
}), initialState);