import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { userForm as validate } from 'validators/user';
import { getUserById } from 'selectors/users';
import { Input, Select, Button, FormActions } from 'components/ui';
import { updateUser } from 'actions/users';

class UserModal extends Component {
    constructor() {
        super();
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(user) {
        return this.props.updateUser(user).then(() => {
            this.props.hideModal();
        });
    }

    render() {
        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать профиль пользователя</div>
                <form className="form" onSubmit={ this.props.handleSubmit(this.updateUser) }>
                    <Field name="username" type="text" label="Имя"
                        component={ Input } readonly
                    />
                    <Field name="email" type="text" label="E-Mail"
                        component={ Input } readonly
                    />
                    <Field name="blocked" label="Состояние"
                        component={ Select } options={ this.props.options.statuses }
                    />
                    <Field name="role" label="Должность"
                        component={ Select } options={ this.props.options.roles }
                    />
                    <FormActions position="right">
                        <Button type="button" view="pseudo" text="Отмена"
                            onClick={ this.props.hideModal }
                        />
                        <Button type="submit" view="action" icon="update"
                            text={ this.props.submitting ? 'Обновление...' : 'Обновить' }
                            disabled={ this.props.pristine || this.props.submitting }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

UserModal.defaultProps = {
    options: {
        statuses: [
            { value: false, label: 'Активен' },
            { value: true, label: 'Заблокирован' },
        ],
        roles: [
            { value: 'manager', label: 'Менеджер' },
            { value: 'senior manager', label: 'Старшый менеджер' },
            { value: 'admin', label: 'Администратор' }
        ]
    }
};

UserModal = reduxForm({
    form: 'updateUser',
    validate
})(UserModal);

export default connect(
    (state, props) => ({
        initialValues: getUserById(state.users.list, props.userId)
    }),
    { updateUser }
)(UserModal);