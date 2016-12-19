import { createReducer } from 'utils';
import { CHANGE_TABLE_SORT, CHANGE_TABLE_ROWS } from 'actions/table';

export default createReducer({
    [CHANGE_TABLE_SORT](state, { key, table }) {
        return {
            ...state, [table]: {
                ...state[table], sort: {
                    key, desc: state[table].sort.key === key ? !state[table].sort.desc : false
                }
            }
        };
    },

    [CHANGE_TABLE_ROWS](state, { rows, table }) {
        return {
            ...state, [table]: {
                ...state[table], rows
            }
        };
    }
}, {
    tickets: {
        rows: 25, sort: {
            key: 'id', desc: true
        }
    },
    users: {
        rows: 10, sort: {
            key: 'blocked', desc: false
        }
    },
    tracks: {
        rows: 25, sort: {
            key: 'id', desc: true
        }
    }
});