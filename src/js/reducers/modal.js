import createReducer from 'utils/@reducer';
import { MODAL_SHOW, MODAL_HIDE } from 'actions/modal';

export default createReducer({
    [MODAL_SHOW](state, { view, props }) {
        return { visible: true, view, props };
    },

    [MODAL_HIDE]() {
        return { visible: false, view: null, props: null };
    }
}, {
    visible: false, view: null, props: null
});