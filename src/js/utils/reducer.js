/**
 * Create reducer util
 * @param <Function>
 * @param <Any> initial state
 * @return <Any> action handler or state
 */
export default (actionHandlersWrapper, initialState) => (state = initialState, { type, payload }) => {
    if (actionHandlersWrapper.hasOwnProperty(type)) {
        return actionHandlersWrapper[type](state, payload);
    }

    return state;
};
