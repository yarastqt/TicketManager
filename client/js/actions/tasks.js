import types from '../constants';

import { hideModal } from './modal';
import { showNotification } from './notifications';

export function getAllTasks() {
    return (dispatch, getState) => {
        const { tasks } = getState();

        if (!tasks.list.length) {
            return dispatch(fetchTasks());
        }
    };
}

export function addTask(data) {
    return {
        type: 'TASK_ADD',
        $payload: {
            request: {
                url: '/tasks',
                method: 'post',
                body: data
            },
            onSuccess: [
                hideModal(),
                showNotification({ message: 'Заявка добавлена' })
            ]
        }
    };   
}

export function updateTask(id, data) {
    return {
        type: 'TASK_UPDATE',
        $payload: {
            request: {
                url: `/tasks/${id}`,
                method: 'put',
                body: data
            },
            onSuccess: [
                hideModal(),
                showNotification({ message: 'Заявка обновлена' })
            ]
        }
    };
}

export function removeTask(id) {
    return {
        type: 'TASK_REMOVE',
        $payload: {
            request: {
                url: `/tasks/${id}`,
                method: 'delete'
            },
            onSuccess: [
                showNotification({ message: 'Заявка удалена' })
            ]
        }
    };
}

function fetchTasks() {
    return {
        type: 'TASKS',
        $payload: {
            request: {
                url: '/tasks',
                method: 'get'
            }
        }
    };
}