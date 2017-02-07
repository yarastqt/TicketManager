import { LOCATION_CHANGE } from 'react-router-redux';

import { hideSidebar } from 'actions/sidebar';

export default function sidebarMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        if (action.type === LOCATION_CHANGE) {
            const { sidebar } = getState();
            const mobileScreen = window.matchMedia('(min-width: 1024px)');

            if (!mobileScreen.matches && sidebar.expanded) {
                dispatch(hideSidebar());
            }
        }

        return next(action);
    };
}
