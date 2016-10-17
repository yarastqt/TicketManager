import { createReducer } from '../utils';
import types from '../constants';

const initialState = {
    tasks: {
        rows: 25,
        sort: {
            key: 'id',
            desc: true
        }
    },
    users: {
        rows: 10,
        sort: {
            key: 'blocked',
            desc: false
        }
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
    }
}), initialState);