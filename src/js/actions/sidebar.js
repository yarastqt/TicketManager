import { SIDEBAR_TOGGLE } from 'constants/sidebar';

export function toggleSidebar() {
    return (dispatch, getState) => {
        const { sidebar } = getState();

        localStorage.setItem('sidebar', !sidebar);
        dispatch({ type: SIDEBAR_TOGGLE });
    };
}