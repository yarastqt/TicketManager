import { createReducer } from 'utils';
import { SET_FILTER, REMOVE_FILTER, REMOVE_ALL_FILTERS } from 'actions/filters';

export default createReducer({
    [SET_FILTER](state, { filter, target }) {
        return {
            ...state, [target]: {
                ...state[target],
                ...filter
            }
        };
    },

    [REMOVE_FILTER](state, { filterName, target }) {
        const filters = state[target];
        delete filters[filterName];

        return {
            ...state, [target]: {
                ...filters
            }
        };
    },

    [REMOVE_ALL_FILTERS](state, { target }) {
        return {
            ...state, [target]: {}
        };
    }
}, {
    tasks: {}, statistics: {}
});