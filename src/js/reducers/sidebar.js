import createReducer from 'utils/@reducer';
import { SIDEBAR_TOGGLE } from 'actions/sidebar';

const sidebar = localStorage.getItem('sidebar');

export default createReducer({
    [SIDEBAR_TOGGLE](state) {
        return { expanded: !state.expanded };
    }
}, {
    expanded: sidebar ? JSON.parse(sidebar) : true
});