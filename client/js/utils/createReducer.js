/**
 * Create reducer util
 * @param <Function>
 * @param <Any> initial state
 * @return <Any> action handler or state
 */
export default (actionHandlersWrapper, initialState) => {
    return (state = initialState, action) => {
        const actionHandlers = actionHandlersWrapper(state, action.payload);

        if (actionHandlers.hasOwnProperty(action.type)) {
            return actionHandlers[action.type]();
        }

        return state;
    };
};