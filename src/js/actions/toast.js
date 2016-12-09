export const TOAST_PUSH = 'TOAST_PUSH';
export const TOAST_EXPIRES = 'TOAST_EXPIRES';

export function pushToast(text, expires) {
    return {
        type: TOAST_PUSH,
        payload: {
            text
        }
    };
}

export function toastExpires() {
    return {
        type: TOAST_EXPIRES
    };
}