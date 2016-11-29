import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import dict from 'constants/dict';
import { profileForm as validate } from 'validators/profile';
import { Content } from 'components/blocks';
import { Input, Button, FormActions } from 'components/ui';
import { updateProfile } from 'actions/profile';

class ProfileView extends Component {
    constructor() {
        super();
        this.updateProfile = this.updateProfile.bind(this);
    }

    updateProfile(profile) {
        // console.log(profile);
        return this.props.updateProfile(profile);
    }

    render() {
        return (
            <Content title="Профиль">
                <div className="content__header">
                    <div className="content__heading">Профиль</div>
                </div>
                <div className="profile">
                    <form className="form" onSubmit={ this.props.handleSubmit(this.updateProfile) }>
                        <div className="profile__cols">
                            <div className="profile__col">
                                <div className="profile__col-title">Персональная информация</div>
                                <div className="profile__col-content">
                                    <Field name="id" type="text" label="ID"
                                        component={ Input } readonly
                                    />
                                    <Field name="role" type="text" label="Группа"
                                        component={ Input } readonly
                                    />
                                    <Field name="username" type="text" label="Имя"
                                        component={ Input }
                                    />
                                    <Field name="email" type="text" label="E-Mail"
                                        component={ Input }
                                    />
                                </div>
                            </div>
                            <div className="profile__col">
                                <div className="profile__col-title">Изменить пароль</div>
                                <div className="profile__col-content">
                                    <Field name="oldPassword" type="password" label="Старый пароль"
                                        component={ Input }
                                    />
                                    <Field name="newPassword" type="password" label="Новый пароль"
                                        component={ Input }
                                    />
                                    <Field name="confirmNewPassword" type="password" label="Новый пароль ещё раз"
                                        component={ Input }
                                    />
                                </div>
                            </div>
                        </div>
                        <FormActions position="right">
                            <Button type="submit" view="action" icon="update" text="Обновить профиль"
                                disabled={ this.props.pristine || this.props.submitting }
                            />
                        </FormActions>
                    </form>
                </div>
            </Content>
        );
    }
}

ProfileView = reduxForm({
    form: 'profile',
    validate
})(ProfileView);

function mapStateToProps(state) {
    const user = state.session.user;

    return {
        initialValues: {
            ...user,
            role: dict.roles[user.role]
        }
    };
}

export default connect(
    mapStateToProps,
    { updateProfile }
)(ProfileView);