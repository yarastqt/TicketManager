import { find } from 'lodash';

export function getUserById(users, id) {
    return find(users, { id }) || {};
}