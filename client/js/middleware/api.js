import { showNotification } from '../actions/notifications';
import { http } from '../utils';

export default ({ dispatch }) => {
    return (next) => (action) => {
        if (!action.$payload) {
            return next(action);
        }

        const { type, $payload } = action;
        const { request, notification } = $payload;
        const { url, method, body } = request;

        dispatch({ type: `${type}_REQUEST` });

        http[method](url, body)
            .then((data) => {
                dispatch({ type: `${type}_SUCCESS`, payload: data });

                if (notification) {
                    dispatch(showNotification(notification));
                }
            })
            .catch((error) => {
                dispatch({ type: `${type}_ERROR`, payload: error });
            });
    };
};