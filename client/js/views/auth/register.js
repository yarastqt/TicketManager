import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { getFormData } from '../../utils';
import { Input, Button } from '../../components/ui';
import { AuthActions } from '../../actions';

const { register } = AuthActions;

class RegisterView extends Component {
    constructor() {
        super();
        this.register = this.register.bind(this);
    }

    register(event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);

        if (data.username && data.password && data.email) {
            this.refs.form.reset();
            this.props.register(data);
        }
    }

    render() {
        return (
            <DocumentTitle title="Регистрация">
                <div className="sign-container__in">
                    <div className="sign-container__title">Регистрация</div>
                    <form className="form" ref="form" onSubmit={ this.register }>
                        <Input type="text" name="username" label="Имя" required autofocus />
                        <Input type="email" name="email" label="E-Mail" required />
                        <Input type="password" name="password" label="Пароль" required />
                        <div className="form__actions">
                            <Button text="Зарегистрироваться" />
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

export default connect(
    (state) => ({}),
    { register }
)(RegisterView);