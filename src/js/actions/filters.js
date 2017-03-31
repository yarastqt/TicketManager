export const TOGGLE_VISIBLE_FILTERS = 'TOGGLE_VISIBLE_FILTERS';

export function toggleVisibleFilters(target) {
    return {
        type: TOGGLE_VISIBLE_FILTERS,
        payload: {
            target
        }
    };
}

export const SET_FILTER = 'SET_FILTER';

export function setFilter(filter, target) {
    return {
        type: SET_FILTER,
        payload: {
            filter,
            target
        }
    };
}

export const REMOVE_FILTER = 'REMOVE_FILTER';

export function removeFilter(filterName, target) {
    return {
        type: REMOVE_FILTER,
        payload: {
            filterName,
            target
        }
    };
}

export const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS';

export function removeAllFilters(target) {
    return {
        type: REMOVE_ALL_FILTERS,
        payload: {
            target
        }
    };
}
