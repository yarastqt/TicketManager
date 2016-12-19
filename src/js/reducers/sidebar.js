import { createReducer } from 'utils';
import { SIDEBAR_TOGGLE } from 'actions/sidebar';

const sidebar = localStorage.getItem('sidebar');

export default createReducer({
    [SIDEBAR_TOGGLE](state) {
        return { expanded: !state.expanded };
    }
}, {
    expanded: true
});