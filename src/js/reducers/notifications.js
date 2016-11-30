import { createReducer } from 'utils';
import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from 'constants/toasts';

export default createReducer((state, payload) => ({
    [NOTIFICATION_SHOW]() {
        return [ ...state, payload ];
    },

    [NOTIFICATION_HIDE]() {
        return state.filter((notification) =>
            notification.id !== payload.id
        );
    }
}), []);