import { reset } from 'redux-form';

import { MODAL_HIDE } from 'actions/modal';

/**
 * Reset modal form to initial values after closing
 */
export default function modalMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        if (action.type === MODAL_HIDE) {
            const { form } = getState();
            const formKeys = Object.keys(form);

            if (formKeys.length) {
                const currentForm = formKeys[0];
                dispatch(reset(currentForm));
            }
        }

        return next(action);
    };
}