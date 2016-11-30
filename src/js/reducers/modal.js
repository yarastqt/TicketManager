import { createReducer } from 'utils';
import { MODAL_SHOW, MODAL_HIDE } from 'constants/modal';

const initialState = {
    visible: false,
    view: null,
    props: null
};

export default createReducer((state, payload) => ({
    [MODAL_SHOW]() {
        return {
            visible: true, view: payload.view, props: payload.props
        };
    },

    [MODAL_HIDE]() {
        return initialState;
    }
}), initialState);