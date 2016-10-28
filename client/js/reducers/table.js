import { createReducer } from '../utils';
import types from '../constants';

const initialState = {
    tasks: {
        rows: 25,
        sort: {
            key: 'id',
            desc: true
        },
        filters: []
    },
    users: {
        rows: 10,
        sort: {
            key: 'blocked',
            desc: false
        },
        filters: []
    }
};

export default createReducer((state, payload) => ({
    [types.CHANGE_TABLE_SORT]() {
        const { key, table } = payload;

        return {
            ...state,
            [table]: {
                ...state[table],
                sort: {
                    key: key,
                    desc: state[table].sort.key === key
                        ? !state[table].sort.desc
                        : false
                }
            }
        };
    },

    [types.CHANGE_TABLE_ROWS]() {
        const { rows, table } = payload;

        return {
            ...state,
            [table]: {
                ...state[table],
                rows
            }
        };
    },

    [types.TABLE_ADD_FILTER]() {
        const { filter, table } = payload;

        return {
            ...state,
            [table]: {
                ...state[table],
                filters: [...state[table].filters, filter]
            }
        };
    }
}), initialState);