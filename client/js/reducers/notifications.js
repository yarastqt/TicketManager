import types from '../constants';

/**
 * Notifications reducer
 * @param <Object> state
 * @param <Object> action
 * @return <Object> new state
 */
export default (state = [], action) => {
    switch (action.type) {
        case types.NOTIFICATION_SHOW:
            return [ ...state, action.payload ];

        case types.NOTIFICATION_HIDE:
            return state.filter((notification) => {
                return notification.id !== action.payload.id;
            });

        default:
            return state;
    }
};