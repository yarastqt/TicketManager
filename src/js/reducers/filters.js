import { createReducer } from 'utils';
import { TOGGLE_VISIBLE_FILTERS, SET_FILTER, REMOVE_FILTER, REMOVE_ALL_FILTERS } from 'actions/filters';

export default createReducer({
    [TOGGLE_VISIBLE_FILTERS](state, { target }) {
        return {
            ...state, [target]: {
                ...state[target], visible: !state[target].visible
            }
        };
    },

    [SET_FILTER](state, { filter, target }) {
        return {
            ...state, [target]: {
                ...state[target], list: { ...state[target].list, ...filter }
            }
        };
    },

    [REMOVE_FILTER](state, { filterName, target }) {
        const filters = state[target].list;
        delete filters[filterName];

        return {
            ...state, [target]: {
                ...state[target], list: { ...filters }
            }
        };
    },

    [REMOVE_ALL_FILTERS](state, { target }) {
        return {
            ...state, [target]: {
                ...state[target], list: {}
            }
        };
    }
}, {
    tickets: {
        visible: false, list: {}
    },
    statistics: {
        visible: false, list: {}
    }
});
