import { http } from 'utils';
import { hideModal } from './modal';
import { pushToast } from './toast';

export const TASKS_LOAD_REQUEST = 'TASKS_LOAD_REQUEST';
export const TASKS_LOAD_SUCCESS = 'TASKS_LOAD_SUCCESS';
export const TASKS_LOAD_FAILURE = 'TASKS_LOAD_FAILURE';

export const TASK_UPDATE_REQUEST = 'TASK_UPDATE_REQUEST';
export const TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS';
export const TASK_UPDATE_FAILURE = 'TASK_UPDATE_FAILURE';

export const TASK_ADD_REQUEST = 'TASK_ADD_REQUEST';
export const TASK_ADD_SUCCESS = 'TASK_ADD_SUCCESS';
export const TASK_ADD_FAILURE = 'TASK_ADD_FAILURE';

export const TASK_REMOVE_REQUEST = 'TASK_REMOVE_REQUEST';
export const TASK_REMOVE_SUCCESS = 'TASK_REMOVE_SUCCESS';
export const TASK_REMOVE_FAILURE = 'TASK_REMOVE_FAILURE';

export function getTasks() {
    return (dispatch, getState) => {
        const { tasks } = getState();

        if (!tasks.list.length) {
            dispatch({ type: TASKS_LOAD_REQUEST });

            return http.get('/v1/tasks').then((payload) => {
                dispatch({ type: TASKS_LOAD_SUCCESS, payload });
            }).catch((error) => {
                // console.log(error);
            });
        }
    };
}

export function addTask(data) {
    return (dispatch) => {
        dispatch({ type: TASK_ADD_REQUEST });

        return http.post('/v1/tasks', data).then((payload) => {
            dispatch({ type: TASK_ADD_SUCCESS, payload });
            dispatch(pushToast('Заявка добавлена'));
        });
    };
}

export function updateTask(task) {
    return (dispatch) => {
        dispatch({ type: TASK_UPDATE_REQUEST });

        return http.put(`/v1/tasks/${task.id}`, task).then((payload) => {
            dispatch({ type: TASK_UPDATE_SUCCESS, payload });
            dispatch(pushToast('Заявка обновлена'));
        });
    };
}

export function removeTask(taskId) {
    return (dispatch) => {
        dispatch({ type: TASK_REMOVE_REQUEST });

        return http.delete(`/v1/tasks/${taskId}`).then((payload) => {
            dispatch({ type: TASK_REMOVE_SUCCESS, payload });
            dispatch(pushToast('Заявка удалена'));
        });
    };
}