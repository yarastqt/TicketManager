import types from '../constants';

const initialState = {
    list: [],
    fetching: true,
    rowsPerPage: 10,
    sort: {
        key: 'blocked',
        desc: false
    },
    filters: {

    }
};

/**
 * Users reducer
 * @param <Object> state
 * @param <Object> action
 * @return <Object> new state
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case types.USERS_REQUEST:
            return { ...state, fetching: true };

        case types.USERS_SUCCESS:
            return { ...state, list: action.payload, fetching: false };

        case types.USER_UPDATE_SUCCESS:
            const list1 = state.list.map((user) => {
                if (user.id === action.payload.id) {
                    return Object.assign({}, user, action.payload);
                }

                return user;
            });

            return { ...state, list: list1 };

        case types.USER_REMOVE_SUCCESS:
            const list2 = state.list.filter((user) => {
                return user.id !== action.payload.id;
            });

            return { ...state, list: list2 };

        case types.TOGGLE_TABLE_SORT:
            if (action.payload.tableName === 'users') {
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