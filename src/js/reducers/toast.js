import { createReducer } from 'utils';
import { TOAST_PUSH, TOAST_EXPIRES } from 'actions/toast';

export default createReducer({
    [TOAST_PUSH](state, { text }) {
        return { ...state, visible: true, text };
    },

    [TOAST_EXPIRES](state) {
        return { ...state, visible: false };
    }
}, {
    visible: false, text: null, expires: 4000
});
