import { MODAL_SHOW, MODAL_HIDE } from 'constants/modal';

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