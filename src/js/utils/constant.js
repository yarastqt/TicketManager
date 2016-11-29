/**
 * Create constants util
 * @param <String> types
 * @return <Object> types map like:
 * { TYPE_ACTION: 'TYPE_ACTION' }
 */
export function createConstants(...types) {
    return types.reduce((container, type) => {
        container[type] = type;
        return container;
    }, {});
}

/**
 * Create async constants util
 * @param <String> type
 * @return <Object> async types map like:
 * { TYPE_REQUEST: 'TYPE_REQUEST', TYPE_SUCCESS: 'TYPE_SUCCESS', TYPE_ERROR: 'TYPE_ERROR' }
 */
export function createAsyncConstants(type) {
    return createConstants(
        `${type}_REQUEST`,
        `${type}_SUCCESS`,
        `${type}_ERROR`
    );
}