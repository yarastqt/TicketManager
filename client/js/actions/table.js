import { push } from 'react-router-redux';

import types from '../constants';

function toggleTableSort(sortKey, tableName) {
    return {
        type: types.TOGGLE_TABLE_SORT,
        payload: {
            sortKey,
            tableName
        }
    };
}

function changeTableRows(rowsPerPage) {
    return {
        type: types.CHANGE_TABLE_ROWS,
        payload: {
            rowsPerPage
        }
    };
}

function paginateTable(page) {
    return (dispatch) => {
        dispatch(push(page));
    };
}

export {
    toggleTableSort,
    changeTableRows,
    paginateTable
};