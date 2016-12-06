import { push } from 'react-router-redux';

export const CHANGE_TABLE_SORT = 'CHANGE_TABLE_SORT';
export const CHANGE_TABLE_ROWS = 'CHANGE_TABLE_ROWS';

export function changeSort(key, table) {
    return {
        type: CHANGE_TABLE_SORT,
        payload: {
            key, table
        }
    };
}

export function changeRows(rows, table) {
    return {
        type: CHANGE_TABLE_ROWS,
        payload: {
            rows, table
        }
    };
}

export function changePage(page) {
    return (dispatch) => {
        dispatch(push(page));
    };
}