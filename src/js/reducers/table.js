import { createReducer } from 'utils';
import types from 'constants';

const {
    CHANGE_TABLE_SORT,
    CHANGE_TABLE_ROWS,
    TABLE_SET_FILTER,
    TABLE_REMOVE_FILTER,
    TABLE_REMOVE_ALL_FILTERS
} = types;

const initialState = {
    tasks: {
        rows: 25,
        sort: {
            key: 'id',
            desc: true
        },
        filters: {}
    },
    users: {
        rows: 10,
        sort: {
            key: 'blocked',
            desc: false
        },
        filters: {}
    },
    tracks: {
        rows: 25,
        sort: {
            key: 'id',
            desc: true
        },
        filters: {}
    }
};

export default createReducer((state, payload) => ({
    [CHANGE_TABLE_SORT]() {
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

    [CHANGE_TABLE_ROWS]() {
        const { rows, table } = payload;

        return {
            ...state,
            [table]: {
                ...state[table],
                rows
            }
        };
    },

    [TABLE_SET_FILTER]() {
        const { filter, table } = payload;

        return {
            ...state,
            [table]: {
                ...state[table],
                filters: { ...state[table].filters, ...filter }
            }
        };
    },

    [TABLE_REMOVE_FILTER]() {
        const { filter, table } = payload;
        const filters = state[table].filters;

        delete filters[filter];

        return {
            ...state,
            [table]: {
                ...state[table],
                filters
            }
        };
    },

    [TABLE_REMOVE_ALL_FILTERS]() {
        const { table } = payload;

        return {
            ...state,
            [table]: {
                ...state[table],
                filters: {}
            }
        };
    }
}), initialState);