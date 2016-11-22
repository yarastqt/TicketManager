import { push } from 'react-router-redux';

import types from 'constants';

const {
    CHANGE_TABLE_SORT,
    CHANGE_TABLE_ROWS,
    TABLE_ADD_FILTER,
    TABLE_REMOVE_FILTER,
    TABLE_REMOVE_ALL_FILTERS
} = types;

export function changeSort(key, table) {
    return {
        type: CHANGE_TABLE_SORT,
        payload: {
            key,
            table
        }
    };
}

export function changeRows(rows, table) {
    return {
        type: CHANGE_TABLE_ROWS,
        payload: {
            rows,
            table
        }
    };
}

export function addFilter(filter, table) {
    return {
        type: TABLE_ADD_FILTER,
        payload: {
            filter,
            table
        }
    };
}

export function removeFilter(filter, table) {
    return {
        type: TABLE_REMOVE_FILTER,
        payload: {
            filter,
            table
        }
    };
}

export function removeAllFilters(table) {
    return {
        type: TABLE_REMOVE_ALL_FILTERS,
        payload: {
            table
        }
    };
}

export function changePage(page) {
    return (dispatch) => {
        dispatch(push(page));
    };
}