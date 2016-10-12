import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

function requireNotAuthentication(ComposedComponent) {
    class NotAuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuthenticated();
        }

        checkAuthenticated() {
            const { user, authenticated, dispatch } = this.props;

            if (authenticated) {
                dispatch(push('/'));
            }
        }

        render() {
            return <ComposedComponent { ...this.props } />;
        }
    }

    return connect((state) => ({
        user: state.session.user,
        authenticated: state.session.authenticated
    }))(NotAuthenticatedComponent);
}

export default requireNotAuthentication;