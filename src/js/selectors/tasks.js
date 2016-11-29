import { getObjectInArray } from 'utils';

export function getTaskById(tasks, taskId) {
    return getObjectInArray(tasks, 'id', taskId);
}