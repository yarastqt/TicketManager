import { find } from 'lodash';

export function getTaskById(tasks, id) {
    return find(tasks, { id: parseInt(id) }) || {};
}