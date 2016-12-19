import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

/**
 * Wrapper for login component
 * if user is authorized then redirect to home
 * @param <Object> component for wrapping
 * @return <Object> wrapped component
 */
function RequireNotAuthentication(ComposedComponent) {
    class NotAuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuthenticated();
        }

        checkAuthenticated() {
            if (this.props.session.authenticated) {
                this.props.push('/');
            }
        }

        render() {
            return <ComposedComponent { ...this.props } />;
        }
    }

    return connect(
        (state) => ({
            session: state.session
        }),
        { push }
    )(NotAuthenticatedComponent);
}

export default RequireNotAuthentication;