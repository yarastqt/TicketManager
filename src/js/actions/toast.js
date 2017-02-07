export const TOAST_PUSH = 'TOAST_PUSH';

export function pushToast(text) {
    return {
        type: TOAST_PUSH,
        payload: {
            text
        }
    };
}

export const TOAST_EXPIRES = 'TOAST_EXPIRES';

export function toastExpires() {
    return {
        type: TOAST_EXPIRES
    };
}
