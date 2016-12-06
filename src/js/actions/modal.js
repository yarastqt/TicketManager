export const MODAL_SHOW = 'MODAL_SHOW';
export const MODAL_HIDE = 'MODAL_HIDE';

export function showModal(view, props) {
    return {
        type: MODAL_SHOW,
        payload: {
            view,
            props
        }
    };
}

export function hideModal() {
    return {
        type: MODAL_HIDE
    };
}