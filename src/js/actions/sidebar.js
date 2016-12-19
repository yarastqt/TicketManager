export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE';

export function toggleSidebar() {
    return (dispatch, getState) => {
        const { sidebar } = getState();

        dispatch({ type: SIDEBAR_TOGGLE });
    };
}