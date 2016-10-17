import { push } from 'react-router-redux';
import types from '../constants';

export function changeSort(key, table) {
    return {
        type: types.CHANGE_TABLE_SORT,
        payload: {
            key,
            table
        }
    };
}

export function changeRows(rows, table) {
    return {
        type: types.CHANGE_TABLE_ROWS,
        payload: {
            rows,
            table
        }
    };
}

export function changePage(page) {
    return (dispatch) => {
        dispatch(push(page));
    };
}