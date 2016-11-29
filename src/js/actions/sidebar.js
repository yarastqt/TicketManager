import types from 'constants';

export function toggleSidebar() {
    return (dispatch, getState) => {
        const { sidebar } = getState();

        localStorage.setItem('sidebar', !sidebar);
        dispatch({ type: types.SIDEBAR_TOGGLE });
    };
}