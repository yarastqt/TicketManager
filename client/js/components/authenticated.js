import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { loadUserProfile } from '../actions/auth';

/**
 * Wrapper for dashboard component
 * if user isn't authorized then redirect to login
 * @param <Object> component for wrapping
 * @return <Object> wrapped component
 */
function requireAuthentication(ComposedComponent) {
    class AuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuthenticated();
        }

        componentWillReceiveProps() {
            this.checkAuthenticated();
        }

        checkAuthenticated() {
            const { user, authenticated, dispatch, location } = this.props;

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

        render() {
            if (!this.props.user || !this.props.authenticated) {
                return null;
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