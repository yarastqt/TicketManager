import find from 'lodash/find';

export function getUserById(users, id) {
    return find(users, { id }) || {};
}