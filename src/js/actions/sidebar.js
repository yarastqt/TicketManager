export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE';

export function toggleSidebar() {
    return (dispatch, getState) => {
        const { sidebar } = getState();

        dispatch({ type: SIDEBAR_TOGGLE });
    };
}

export const SIDEBAR_HIDE = 'SIDEBAR_HIDE';

export function hideSidebar() {
    return {
        type: SIDEBAR_HIDE
    };
}