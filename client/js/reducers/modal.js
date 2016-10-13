import { createReducer } from '../utils';
import types from '../constants';

const initialState = {
    visible: false,
    view: null,
    props: null
};

/**
 * Modal reducer
 * @param <Object> initial state
 * @param <Object> actions
 * @return <Object> new state
 */
export default createReducer((state, payload) => ({
    [types.MODAL_SHOW]() {
        return { visible: true, view: payload.view, props: payload.props };
    },

    [types.MODAL_HIDE]() {
        return initialState;
    }
}), initialState);