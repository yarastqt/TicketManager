import types from 'constants';
import { http } from 'utils';
import { hideModal } from './modal';
import { showNotification } from './notifications';

const {
    TASKS_REQUEST,
    TASKS_SUCCESS,
    TASK_ADD_REQUEST,
    TASK_ADD_SUCCESS,
    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_REMOVE_REQUEST,
    TASK_REMOVE_SUCCESS
} = types;

function fetchTasks() {
    return (dispatch) => {
        dispatch({ type: TASKS_REQUEST });

        return http.get('/v1/tasks').then(
            (payload) => dispatch({ type: TASKS_SUCCESS, payload })
        );
    };
}

export function getAllTasks() {
    return (dispatch, getState) => {
        const { tasks } = getState();

        if (!tasks.list.length) {
            return dispatch(fetchTasks());
        }
    };
}

function addTaskSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: TASK_ADD_SUCCESS, payload });
        dispatch(showNotification({ message: 'Заявка добавлена' }));
        dispatch(hideModal());
    };
}

export function addTask(data) {
    return (dispatch) => {
        dispatch({ type: TASK_ADD_REQUEST });

        return http.post('/v1/tasks', data).then(
            (payload) => dispatch(addTaskSuccess(payload))
        );
    };
}

function updateTaskSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: TASK_UPDATE_SUCCESS, payload });
        dispatch(showNotification({ message: 'Заявка обновлена' }));
        dispatch(hideModal());
    };
}

export function updateTask(id, data) {
    return (dispatch) => {
        dispatch({ type: TASK_UPDATE_REQUEST });

        return http.put(`/v1/tasks/${id}`, data).then(
            (payload) => dispatch(updateTaskSuccess(payload))
        );
    };
}

function removeTaskSuccess(payload) {
    return (dispatch) => {
        dispatch({ type: TASK_REMOVE_SUCCESS, payload });
        dispatch(showNotification({ message: 'Заявка удалена' }));
    };
}

export function removeTask(id) {
    return (dispatch) => {
        dispatch({ type: TASK_REMOVE_REQUEST });

        return http.delete(`/v1/tasks/${id}`).then(
            (payload) => dispatch(removeTaskSuccess(payload))
        );
    };
}