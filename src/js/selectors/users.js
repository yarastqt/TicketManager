import { getObjectInArray } from 'utils';

export function getUserById(users, userId) {
    return getObjectInArray(users, 'id', userId);
}