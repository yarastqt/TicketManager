import { NotificationActions } from 'actions';
import { http } from 'utils';

const { showNotification } = NotificationActions;

export default ({ dispatch }) => {
    return (next) => (action) => {
        if (!action.$payload) {
            return next(action);
        }

        const { type, $payload } = action;
        const { request, onSuccess } = $payload;
        const { url, method, body } = request;

        dispatch({ type: `${type}_REQUEST` });

        http[method](url, body)
            .then((data) => {
                dispatch({ type: `${type}_SUCCESS`, payload: data });

                if (onSuccess && onSuccess.length) {
                    onSuccess.map((action) => {
                        dispatch(action);
                    });
                }
            })
            .catch((error) => {
                dispatch({ type: `${type}_ERROR`, payload: error });
            });
    };
};