/**
 * Create reducer util
 * @param <Function>
 * @param <Any> initial state
 * @return <Any> action handler or state
 */
export default (actionHandlersWrapper, initialState) => {
    return (state = initialState, { type, payload }) => {
        const actionHandlers = actionHandlersWrapper(state, payload);

        if (actionHandlers.hasOwnProperty(type)) {
            return actionHandlers[type]();
        }

        return state;
    };
};