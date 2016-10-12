import types from '../constants';

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
            notification: {
                message: 'Запись добавлена'
            }
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
            notification: {
                message: 'Заявка обновлена'
            }
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
            notification: {
                message: 'Заявка удалена'
            }
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