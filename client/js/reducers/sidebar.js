import { createReducer } from '../utils';
import types from '../constants';

const initialState = localStorage.getItem('sidebar')
    ? JSON.parse(localStorage.getItem('sidebar'))
    : true;

/**
 * Sidebar reducer
 * @param <Object> initial state
 * @param <Object> actions
 * @return <Object> new state
 */
export default createReducer((state, payload) => ({
    [types.SIDEBAR_TOGGLE]() {
        return !state;
    }
}), initialState);