import { createReducer } from 'utils';
import { MODAL_SHOW, MODAL_HIDE } from 'actions/modal';

export default createReducer({
    [MODAL_SHOW](state, { view, props }) {
        return { visible: true, view, props };
    },

    [MODAL_HIDE](state) {
        return { ...state, visible: false };
    }
}, {
    visible: false, view: null, props: null
});