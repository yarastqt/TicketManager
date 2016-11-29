import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

/**
 * Wrapper for login component
 * if user is authorized then redirect to home
 * @param <Object> component for wrapping
 * @return <Object> wrapped component
 */
function requireNotAuthentication(ComposedComponent) {
    class NotAuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuthenticated();
        }

        checkAuthenticated() {
            const { authenticated, dispatch } = this.props;

            if (authenticated) {
                dispatch(push('/'));
            }
        }

        render() {
            return <ComposedComponent { ...this.props } />;
        }
    }

    return connect((state) => ({
        authenticated: state.session.authenticated
    }))(NotAuthenticatedComponent);
}

export default requireNotAuthentication;