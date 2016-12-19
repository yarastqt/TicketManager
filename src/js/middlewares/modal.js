import { reset } from 'redux-form';

import { MODAL_HIDE } from 'actions/modal';

/**
 * Reset modal form to initial values after closing
 */
export default function modalMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        if (action.type === MODAL_HIDE) {
            const { form } = getState();
            const forms = ['ticketAddForm', 'ticketEditForm', 'trackAddForm', 'trackEditForm'];

            Object.keys(form).map((formName) => {
                if (forms.indexOf(formName) !== -1) {
                    dispatch(reset(formName));
                }
            });
        }

        return next(action);
    };
}