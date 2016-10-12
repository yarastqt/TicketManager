import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormData } from '../../utils';
import { Input, Select, Button } from '../../components/common/form';
import { updateUser } from '../../actions/users';
import { getUserById } from '../../selectors/users';

class UserModal extends Component {
    updateUser(id, event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);

        if (data.blocked && data.role) {
            this.props.dispatch(updateUser(id, data));
        }
    }

    render() {
        const { user, hideModal } = this.props;
        const { id, username, email, blocked, role } = user;

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать профиль пользователя</div>
                <form className="form" ref="form" onSubmit={ this.updateUser.bind(this, id) }>
                    <Input type="text" name="username" label="Имя" disabled value={ username } />
                    <Input type="text" name="email" label="E-Mail" disabled value={ email } />
                    <Select name="blocked" label="Состояние" value={ blocked }>
                        <option value="false">Активен</option>
                        <option value="true">Заблокирован</option>
                    </Select>
                    <Select name="role" label="Роль" value={ role }>
                        <option value="newbie">Новичок</option>
                        <option value="manager">Менеджер</option>
                        <option value="senior manager">Старшый менеджер</option>
                        <option value="admin">Администратор</option>
                    </Select>
                    <div className="form__actions">
                        <Button icon="update" text="Обновить" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect((state, props) => ({
    user: getUserById(state.users.list, props.userId)
}))(UserModal);