import { createSelector } from 'reselect';
import { getObjectInArray } from 'utils';

export const getTaskById = createSelector(
    (state) => state.tasks.list,
    (state, props) => props.taskId,
    (tasks, id) => getObjectInArray(tasks, 'id', id)
);