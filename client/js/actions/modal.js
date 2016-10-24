import types from '../constants';

export function showModal(view, props) {
    return {
        type: types.MODAL_SHOW,
        payload: {
            view,
            props
        }
    };
}

export function hideModal() {
    return {
        type: types.MODAL_HIDE
    };
}