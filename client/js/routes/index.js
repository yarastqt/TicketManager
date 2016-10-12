import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';

// Base containers
import App from '../containers/app';
import Dashboard from '../containers/dashboard';

// Helper components
import requireNotAuthentication from '../components/notAuthenticated';
import requireAuthentication from '../components/authenticated';

// Auth components
import Auth from '../containers/auth';
import RegisterView from '../views/auth/register';
import LoginView from '../views/auth/login';

// Task components
import TasksContainer from '../containers/tasks';
import TasksView from '../views/tasks';

// User components
import UsersContainer from '../containers/users';
import UsersView from '../views/users';

// NotFound component
import NotFound from '../views/notfound';

/**
 * configureRoutes
 * @param <Object> store
 * @return <Object> routes
 */
export default (store) => {
    return (
        <Route component={ App }>
            <Route path="/auth" component={ requireNotAuthentication(Auth) }>
                <Route path="login" component={ LoginView } />
                <Route path="register" component={ RegisterView } />
            </Route>
            <Route path="/" component={ requireAuthentication(Dashboard) }>
                <IndexRedirect to="/tasks" />
                <Route path="tasks" component={ TasksContainer }>
                    <IndexRoute component={ TasksView } />
                    <Route path="page/:pageId" component={ TasksView } />
                </Route>
                <Route path="users" component={ UsersContainer }>
                    <IndexRoute component={ UsersView } />
                    <Route path="page/:pageId" component={ UsersView } />
                </Route>
            </Route>
            <Route path="*" component={ NotFound } />
        </Route>
    );
};