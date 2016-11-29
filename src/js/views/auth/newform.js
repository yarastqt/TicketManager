import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Field, getFormSubmitErrors, reduxForm } from 'redux-form'

import { getFormData } from 'utils';
import { Input, Button } from 'components/ui';
import { AuthActions } from 'actions';

const { login } = AuthActions;

const renderField = ({ input, label, type, meta: { active, touched, error } }) => {
    return (
        <div className={ active ? 'form__field form__field_focused' : 'form__field' }>
            { label && <label htmlFor="" className="form__field-label">{ label }</label> }
            <div className="input">
                <input className="input__control" type={ type } { ...input } />
            </div>
            { touched && error }
        </div>
    );
}

class LoginView extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    login(data) {

        // console.log(values);

        // event.preventDefault();
        // const data = getFormData(this.refs.form);
        const redirectAfterLogin =
            this.props.location.state && this.props.location.state.next || '/';

        // if (data.password && data.email) {
            this.props.login(data, redirectAfterLogin);
        // }
    }

    render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props

        return (
            <DocumentTitle title="Авторизация">
                <div className="sign-container__in">
                    <div className="sign-container__title">Авторизация</div>
                    <form className="form" ref="form" onSubmit={ handleSubmit(this.login) }>
                        <Field name="email" type="text" component={renderField} label="E-Mail" />
                        <Field name="password" type="password" component={renderField} label="Пароль" />
                        {error && <strong>{error}</strong>}
                        <div className="form__actions">
                            <Button text="Войти" disabled={ submitting } />
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

LoginView = reduxForm({
    form: 'loginForm'
})(LoginView);

export default connect(
    (state) => ({
        submitErrors: getFormSubmitErrors('loginForm')(state)
    }),
    { login }
)(LoginView);