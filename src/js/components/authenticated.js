import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import NotFound from 'views/notfound';
import { loadUserProfile } from 'actions/auth';

/**
 * Wrapper for dashboard component
 * if user isn't authorized then redirect to login
 * @param <Object> component for wrapping
 * @return <Object> wrapped component
 */
function requireAuthentication(ComposedComponent) {
    class AuthenticatedComponent extends Component {
        state = {
            allowed: true
        };

        componentWillMount() {
            this.checkAuthenticated(this.props);
            this.checkAccess(this.props);
        }

        componentWillReceiveProps(nexProps) {
            this.checkAuthenticated(nexProps);
            this.checkAccess(nexProps);
        }

        checkAuthenticated(props) {
            const { user, authenticated, dispatch, location } = props;

            if (!user && authenticated) {
                dispatch(loadUserProfile());
            } else if (!authenticated) {
                dispatch(replace({
                    pathname: '/auth/login',
                    state: {
                        next: location.pathname
                    }
                }));
            }
        }

        checkAccess(props) {
            props.routes.map((route) => {
                if (route.hasOwnProperty('roles') && props.user) {
                    if (route.roles.indexOf(props.user.role) === -1) {
                        this.setState({ allowed: false });
                    }
                } else {
                    this.setState({ allowed: true });
                }
            });
        }

        render() {
            if (!this.props.user || !this.props.authenticated) {
                return null;
            } else if (!this.state.allowed) {
                return <NotFound />;
            }

            return <ComposedComponent { ...this.props } />;
        }
    }

    return connect((state) => ({
        user: state.session.user,
        authenticated: state.session.authenticated
    }))(AuthenticatedComponent);
}

export default requireAuthentication;