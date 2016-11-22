import types from 'constants';

export function showNotification(data) {
    return (dispatch) => {
        const id = Date.now();

        dispatch({
            type: types.NOTIFICATION_SHOW,
            payload: { ...data, id }
        });

        // setTimeout(() => {
        //     dispatch(hideNotification(id));
        // }, 2000);
    }
}

export function hideNotification(id) {
    return {
        type: types.NOTIFICATION_HIDE,
        payload: {
            id
        }
    };
}