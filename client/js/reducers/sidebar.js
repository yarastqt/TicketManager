import types from '../constants';

const initialState = localStorage.getItem('sidebar')
    ? JSON.parse(localStorage.getItem('sidebar'))
    : true;

/**
 * Sidebar reducer
 * @param <Object> state
 * @param <Object> action
 * @return <Object> new state
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SIDEBAR_TOGGLE:
            return !state;

        default:
            return state;
    }
};