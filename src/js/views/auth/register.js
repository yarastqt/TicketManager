import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Field, reduxForm } from 'redux-form';

import { registerForm as validate } from 'validators/auth';
import { Input, Button, FormActions } from 'components/ui';
import { register } from 'actions/auth';

class RegisterView extends Component {
    constructor() {
        super();
        this.state = { successRegistration: false };
        this.register = this.register.bind(this);
    }

    register(credentials) {
        return this.props.register(credentials).then(() => {
            this.setState({ successRegistration: true });
            this.props.reset();
        });
    }

    render() {
        return (
            <DocumentTitle title="Регистрация">
                { this.state.successRegistration ? (
                    <div className="sign-container__success">Регистрация прошла успешно.<br />Ожидайте подтверждения администратора</div>
                ) : (
                    <div className="sign-container__in">
                        <div className="sign-container__title">Регистрация</div>
                        <form className="form" autoComplete="off" onSubmit={ this.props.handleSubmit(this.register) }>
                            <Field name="username" type="text" label="Имя" placeholder="Marvin"
                                component={ Input }
                            />
                            <Field name="email" type="text" label="E-Mail" placeholder="example@domain.com"
                                component={ Input }
                            />
                            <Field name="password" type="password" label="Пароль"
                                component={ Input }
                            />
                            <FormActions position="right">
                                <Button type="submit" view="action"
                                    text={ this.props.submitting ? 'Регистрация...' : 'Зарегистрироваться' }
                                    disabled={ this.props.submitting }
                                />
                            </FormActions>
                        </form>
                    </div>
                ) }
            </DocumentTitle>
        );
    }
}

RegisterView = reduxForm({
    form: 'auth/register',
    validate
})(RegisterView);

export default connect(
    null,
    { register }
)(RegisterView);