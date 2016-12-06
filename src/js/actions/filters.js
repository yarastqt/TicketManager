export const SET_FILTER = 'SET_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS';

export function setFilter(filter, target) {
    return {
        type: SET_FILTER,
        payload: {
            filter, target
        }
    };
}

export function removeFilter(filterName, target) {
    return {
        type: REMOVE_FILTER,
        payload: {
            filterName, target
        }
    };
}

export function removeAllFilters(target) {
    return {
        type: REMOVE_ALL_FILTERS,
        payload: {
            target
        }
    };
}