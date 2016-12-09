import { createReducer, updateObjectInArray, deleteObjectFromArray } from 'utils';
import { TASKS_LOAD_REQUEST, TASKS_LOAD_SUCCESS, TASK_ADD_REQUEST, TASK_ADD_SUCCESS, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS, TASK_REMOVE_SUCCESS } from 'actions/tasks';

export default createReducer({
    [TASKS_LOAD_REQUEST](state) {
        return {
            ...state, fetching: true
        };
    },

    [TASKS_LOAD_SUCCESS](state, list) {
        return {
            ...state, list, fetching: false
        };
    },

    [TASK_ADD_SUCCESS](state, task) {
        return {
            ...state, list: [...state.list, task]
        };
    },

    [TASK_UPDATE_SUCCESS](state, task) {
        return {
            ...state, list: updateObjectInArray(state.list, 'id', task)
        };
    },

    [TASK_REMOVE_SUCCESS](state, { id }) {
        return {
            ...state, list: deleteObjectFromArray(state.list, 'id', parseInt(id))
        };
    }
}, {
    list: [],
    fetching: true
});