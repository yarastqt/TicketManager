import React, { Component } from 'react';
import { connect } from 'react-redux';

import dict from 'constants/dict';
import { getFormData } from 'utils';
import { Content } from 'components/blocks';
import { Input, Button } from 'components/ui';
import { ProfileActions } from 'actions';

const { updateProfile } = ProfileActions;

class ProfileView extends Component {
    constructor() {
        super();
        this.updateProfile = this.updateProfile.bind(this);
    }

    updateProfile(event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);

        if (data.email && data.username) {
            this.props.updateProfile(data);
        }
    }

    render() {
        const { id, role, email, username } = this.props.user;

        return (
            <Content title="Профиль">
                <div className="content__header">
                    <div className="content__heading">Профиль</div>
                </div>
                <div className="profile">
                    <form className="form" ref="form" onSubmit={ this.updateProfile }>
                        <div className="profile__cols">
                            <div className="profile__col">
                                <div className="profile__col-title">Персональная информация</div>
                                <div className="profile__col-content">
                                    <Input type="text" name="id" label="ID" value={ id } disabled />
                                    <Input type="text" name="role" label="Группа" value={ dict.roles[role] } disabled />
                                    <Input type="text" name="username" label="Имя" value={ username } required />
                                    <Input type="email" name="email" label="E-Mail" value={ email } required />
                                </div>
                            </div>
                            <div className="profile__col">
                                <div className="profile__col-title">Изменить пароль</div>
                                <div className="profile__col-content">
                                    <Input type="password" name="oldPassword" label="Старый пароль" />
                                    <Input type="password" name="newPassword" label="Новый пароль" />
                                </div>
                            </div>
                        </div>
                        <div className="form__actions">
                            <Button icon="update" text="Обновить профиль" />
                        </div>
                    </form>
                </div>
            </Content>
        );
    }
}

export default connect(
    (state) => ({
        user: state.session.user
    }),
    { updateProfile }
)(ProfileView);