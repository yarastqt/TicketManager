export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE';

export function toggleSidebar() {
    return (dispatch, getState) => {
        const { sidebar } = getState();

        localStorage.setItem('sidebar', !sidebar.expanded);
        dispatch({ type: SIDEBAR_TOGGLE });
    };
}