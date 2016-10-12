import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { getFormData } from '../../utils';
import { Input, Button } from '../../components/common/form';
import { login } from '../../actions/auth';

class LoginView extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);
        const redirectAfterLogin =
            this.props.location.state && this.props.location.state.next || '/';

        if (data.password && data.email) {
            this.props.dispatch(login(data, redirectAfterLogin));
        }
    }

    render() {
        return (
            <DocumentTitle title="Авторизация">
                <div className="sign-container__in">
                    <div className="sign-container__title">Авторизация</div>
                    <form className="form" ref="form" onSubmit={ this.handleSubmit.bind(this) }>
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

export default connect((state) => ({}))(LoginView);