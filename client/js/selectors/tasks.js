import find from 'lodash/find';

export function getTaskById(tasks, id) {
    return find(tasks, { id: parseInt(id) }) || {};
}