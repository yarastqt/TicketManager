export default function createReducer(actionHandlersWrapper, initialState) {
    return (state = initialState, action) => {
        const actionHandlers = actionHandlersWrapper(state, action.payload);

        if (actionHandlers.hasOwnProperty(action.type)) {
            return actionHandlers[action.type]();
        }

        return state;
    };
}