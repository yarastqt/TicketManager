import { createSelector } from 'reselect';
import { getObjectInArray } from 'utils';

export const getUserById = createSelector(
    (state) => state.users.list,
    (state, props) => props.userId,
    (users, id) => getObjectInArray(users, 'id', id)
);
