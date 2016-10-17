import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { getFormData } from '../../utils';
import { Input, Button } from '../../components/ui';
import { AuthActions } from '../../actions';

const { login } = AuthActions;

class LoginView extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);
        const redirectAfterLogin =
            this.props.location.state && this.props.location.state.next || '/';

        if (data.password && data.email) {
            this.props.login(data, redirectAfterLogin);
        }
    }

    render() {
        return (
            <DocumentTitle title="Авторизация">
                <div className="sign-container__in">
                    <div className="sign-container__title">Авторизация</div>
                    <form className="form" ref="form" onSubmit={ this.login }>
                        <Input type="email" name="email" label="E-Mail" required autofocus />
                        <Input type="password" name="password" label="Пароль" required />
                        <div className="form__actions">
                            <Button text="Войти" />
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

export default connect(
    (state) => ({}),
    { login }
)(LoginView);