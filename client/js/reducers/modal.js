import types from '../constants';

const initialState = {
    visible: false,
    view: null,
    props: null
};

/**
 * Modal reducer
 * @param <Object> state
 * @param <Object> action
 * @return <Object> new state
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case types.MODAL_SHOW:
            return { visible: true, view: action.payload.view, props: action.payload.props };

        case types.MODAL_HIDE:
            return initialState;

        default:
            return state;
    }
};