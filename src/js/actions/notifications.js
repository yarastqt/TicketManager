import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from 'constants/toasts';

export function showNotification(data) {
    return (dispatch) => {
        const id = Date.now();

        dispatch({ type: NOTIFICATION_SHOW, payload: { ...data, id } });

        setTimeout(() => {
            dispatch(hideNotification(id));
        }, 2000);
    }
}

export function hideNotification(id) {
    return {
        type: NOTIFICATION_HIDE,
        payload: {
            id
        }
    };
}