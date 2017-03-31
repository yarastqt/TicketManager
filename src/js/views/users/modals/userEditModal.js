import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { userForm as validate } from 'validators/user';
import { userSelectOptions } from 'constants/select';
import { getUserById } from 'selectors/users';
import { Input, Select, Button, Form, FormActions } from 'components/ui';
import { updateUser } from 'actions/users';

class UserEditModal extends Component {
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
                <Form onSubmit={ this.props.handleSubmit(this.updateUser) } submitting={ this.props.submitting }>
                    <Field
                        name="username"
                        type="text"
                        label="Имя"
                        component={ Input }
                    />
                    <Field
                        name="email"
                        type="text"
                        label="E-Mail"
                        component={ Input }
                    />
                    <Field
                        name="blocked"
                        label="Состояние"
                        component={ Select }
                        options={ this.props.options.statuses }
                    />
                    <Field
                        name="role"
                        label="Должность"
                        component={ Select }
                        options={ this.props.options.roles }
                    />
                    <FormActions position="right">
                        <Button
                            type="button"
                            view="pseudo"
                            text="Отмена"
                            onClick={ this.props.hideModal }
                        />
                        <Button
                            type="submit"
                            view="action"
                            icon="update"
                            text={ this.props.submitting ? 'Обновление...' : 'Обновить' }
                            disabled={ this.props.pristine || this.props.submitting }
                        />
                    </FormActions>
                </Form>
            </div>
        );
    }
}

UserEditModal.defaultProps = {
    ...userSelectOptions
};

UserEditModal = reduxForm({
    form: 'updateUser',
    enableReinitialize: true,
    validate
})(UserEditModal);

export default connect(
    (state, props) => ({
        initialValues: getUserById(state, props)
    }),
    { updateUser }
)(UserEditModal);
