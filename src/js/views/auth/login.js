import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Field, reduxForm } from 'redux-form';

import { loginForm as validate } from 'validators/auth';
import { Input, Button, FormActions } from 'components/ui';
import { login } from 'actions/session';

class LoginView extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    login(credentials) {
        const { state } = this.props.location;
        return this.props.login(credentials, state && state.next || '/');
    }

    render() {
        return (
            <DocumentTitle title="Авторизация">
                <div className="sign-container__in">
                    <div className="sign-container__title">Авторизация</div>
                    <form className="form" autoComplete="off" onSubmit={ this.props.handleSubmit(this.login) }>
                        <Field name="email" type="text" label="E-Mail"
                            component={ Input }
                        />
                        <Field name="password" type="password" label="Пароль"
                            component={ Input }
                        />
                        <FormActions position="right">
                            <Button type="submit" view="action"
                                text={ this.props.submitting ? 'Авторизация...' : 'Войти' }
                                disabled={ this.props.submitting }
                            />
                        </FormActions>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

LoginView = reduxForm({
    form: 'loginForm',
    validate
})(LoginView);

export default connect(
    null,
    { login }
)(LoginView);