import { push } from 'react-router-redux';

import { TABLE_SET_FILTER, TABLE_REMOVE_FILTER, TABLE_REMOVE_ALL_FILTERS } from 'constants/table';

export default function tableMiddleware({ dispatch }) {
    return (next) => (action) => {
        const actions = [
            TABLE_SET_FILTER,
            TABLE_REMOVE_FILTER,
            TABLE_REMOVE_ALL_FILTERS
        ].indexOf(action.type);

        if (actions !== -1) {
            const paths = location.pathname.split('/').filter((value) => value);

            if (paths.length > 1) {
                dispatch(push(`/${paths[0]}`));
            }
        }

        return next(action);
    };
}