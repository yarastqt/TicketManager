import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';

// Base containers
import App from 'containers/app';
import Dashboard from 'containers/dashboard';
import Auth from 'containers/auth';

// Helper components
import RequireNotAuthentication from 'components/notAuthenticated';
import RequireAuthentication from 'components/authenticated';

// Views
import RegisterView from 'views/auth/register';
import LoginView from 'views/auth/login';
import TicketsView from 'views/tickets';
import UsersView from 'views/users';
import ProfileView from 'views/profile';
import ProfileCommonView from 'views/profile/common';
import ProfileSecurityView from 'views/profile/security';
// import StatisticsView from 'views/statistics';
import TracksView from 'views/tracks';
import NotFound from 'views/notfound';

/**
 * Configure routes
 * @return <Object> routes
 */
export default () => (
    <Route component={ App }>
        <Route path="/auth" component={ RequireNotAuthentication(Auth) }>
            <Route path="login" component={ LoginView } />
            <Route path="register" component={ RegisterView } />
        </Route>
        <Route path="/" component={ RequireAuthentication(Dashboard) }>
            <IndexRedirect to="/tickets" />
            <Route path="tickets" component={ TicketsView }>
                <Route path="page/:page" />
            </Route>
            <Route path="users" component={ UsersView } roles={ ['admin'] }>
                <Route path="page/:page" />
            </Route>
            <Route path="profile" component={ ProfileView }>
                <IndexRoute component={ ProfileCommonView } />
                <Route path="security" component={ ProfileSecurityView } />
            </Route>
            {/*<Route path="statistics" component={ StatisticsView } />*/}
            <Route path="statistics" getComponents={ (nexState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('views/statistics').default);
                }, 'statistics');
            } } />
            <Route path="tracks" component={ TracksView } />
        </Route>
        <Route path="*" component={ NotFound } />
    </Route>
);