import { push } from 'react-router-redux';

import types from 'constants';

export default function tableMiddleware({ dispatch }) {
    return (next) => (action) => {
        const actions = [
            types.TABLE_SET_FILTER,
            types.TABLE_REMOVE_FILTER,
            types.TABLE_REMOVE_ALL_FILTERS
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