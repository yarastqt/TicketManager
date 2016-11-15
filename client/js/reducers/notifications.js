import { createReducer } from 'utils';
import types from 'constants';

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