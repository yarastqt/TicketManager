import { createReducer } from '../utils';
import types from '../constants';

/**
 * Notifications reducer
 * @param <Object> initial state
 * @param <Object> actions
 * @return <Object> new state
 */
export default createReducer((state, payload) => ({
    [types.NOTIFICATION_SHOW]() {
        return [ ...state, payload ];
    },

    [types.NOTIFICATION_HIDE]() {
        return state.filter((notification) =>
            notification.id !== payload.id
        );
    }
}), []);