export const MODAL_SHOW = 'MODAL_SHOW';

export function showModal(view, props) {
    return {
        type: MODAL_SHOW,
        payload: {
            view,
            props
        }
    };
}

export const MODAL_HIDE = 'MODAL_HIDE';

export function hideModal() {
    return {
        type: MODAL_HIDE
    };
}
