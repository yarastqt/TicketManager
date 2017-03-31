import { createReducer } from 'utils';
import { SIDEBAR_TOGGLE, SIDEBAR_HIDE } from 'actions/sidebar';

export default createReducer({
    [SIDEBAR_TOGGLE](state) {
        return {
            expanded: !state.expanded
        };
    },

    [SIDEBAR_HIDE]() {
        return {
            expanded: false
        };
    }
}, {
    expanded: true
});
