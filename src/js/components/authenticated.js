import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import NotFound from 'views/notfound';
import { checkUserExpires } from 'actions/session';

/**
 * Wrapper for dashboard component
 * if user isn't authorized then redirect to login
 * @param <Object> component for wrapping
 * @return <Object> wrapped component
 */
function RequireAuthentication(ComposedComponent) {
    class AuthenticatedComponent extends Component {
        constructor() {
            super();
            this.state = { allowed: false };
        }

        componentWillMount() {
            this.checkAuthenticated(this.props);
            this.checkAccess(this.props);
        }

        componentWillReceiveProps(nexProps) {
            this.checkAuthenticated(nexProps);
            this.checkAccess(nexProps);
        }

        checkAuthenticated(props) {
            if (this.props.session.user && this.props.session.authenticated) {
                this.props.checkUserExpires();
            } else if (!this.props.session.authenticated) {
                this.props.replace({
                    pathname: '/auth/login',
                    state: {
                        next: this.props.location.pathname
                    }
                });
            }
        }

        checkAccess(props) {
            props.routes.map((route) => {
                if (route.hasOwnProperty('roles') && props.session.user) {
                    if (route.roles.indexOf(props.session.user.role) === -1) {
                        this.setState({ allowed: false });
                    }
                } else {
                    this.setState({ allowed: true });
                }
            });
        }

        render() {
            if (!this.props.session.user || !this.props.session.authenticated) {
                return null;
            } else if (!this.state.allowed) {
                return <NotFound />;
            }

            return <ComposedComponent { ...this.props } />;
        }
    }

    return connect(
        (state) => ({
            session: state.session
        }),
        { checkUserExpires, replace }
    )(AuthenticatedComponent);
}

export default RequireAuthentication;