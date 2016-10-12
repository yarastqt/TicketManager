import types from '../constants';

const initialState = {
    authenticated: localStorage.getItem('token') ? true : false,
    user: null
};

/**
 * Session reducer
 * @param <Object> state
 * @param <Object> action
 * @return <Object> new state
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return { authenticated: false, user: null };

        case types.LOGIN_SUCCES:
            return { authenticated: true, user: action.payload.user };

        case types.LOGOUT_SUCCESS:
            return { authenticated: false, user: null };

        default:
            return state;
    }
};