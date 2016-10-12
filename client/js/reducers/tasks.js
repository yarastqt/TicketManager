import types from '../constants';

const initialState = {
    list: [],
    fetching: true,
    rowsPerPage: 25,
    sort: {
        key: 'id',
        desc: true
    },
    filters: {

    }
};

/**
 * Tasks reducer
 * @param <Object> state
 * @param <Object> action
 * @return <Object> new state
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case types.TASKS_REQUEST:
            return { ...state, fetching: true };

        case types.TASKS_SUCCESS:
            return { ...state, list: action.payload, fetching: false };

        case types.TASK_ADD_SUCCESS:
            return { ...state, list: [ ...state.list, action.payload ] };

        case types.TASK_UPDATE_SUCCESS:
            const list1 = state.list.map((task) => {
                if (task.id === action.payload.id) {
                    return Object.assign({}, task, action.payload);
                }

                return task;
            });

            return { ...state, list: list1 };

        case types.TASK_REMOVE_SUCCESS:
            const list2 = state.list.filter((task) => {
                return task.id !== parseInt(action.payload.id);
            });

            return { ...state, list: list2 };

        case types.TOGGLE_TABLE_SORT:
            if (action.payload.tableName === 'tasks') {
                if (action.payload.sortKey === state.sort.key) {
                    return { ...state, sort: { ...state.sort, desc: !state.sort.desc } };
                }

                return { ...state, sort: { key: action.payload.sortKey, desc: false } };
            }

            return state;

        case types.CHANGE_TABLE_ROWS:
            return { ...state, rowsPerPage: action.payload.rowsPerPage };

        default:
            return state;
    }
};