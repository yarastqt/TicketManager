import { push } from 'react-router-redux';

import { SET_FILTER, REMOVE_FILTER, REMOVE_ALL_FILTERS } from 'actions/filters';
import { CHANGE_TABLE_ROWS } from 'actions/table';

export default function tableMiddleware({ dispatch }) {
    return (next) => (action) => {
        const actions = [SET_FILTER, REMOVE_FILTER, REMOVE_ALL_FILTERS, CHANGE_TABLE_ROWS];

        if (actions.indexOf(action.type) !== -1) {
            const targets = ['tickets'].indexOf(action.payload.target || action.payload.table);

            if (targets !== -1) {
                const paths = location.pathname.split('/').filter((value) => value);

                if (paths.length > 1) {
                    dispatch(push(`/${paths[0]}`));
                }
            }
        }

        return next(action);
    };
}
