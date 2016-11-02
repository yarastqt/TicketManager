import React, { Component } from 'react';
import { connect } from 'react-redux';

import dict from '../../constants/dict';
import { Content, Loader } from '../../components/blocks';
import { Table, TableColumn, TableHeader } from '../../components/ui';
import { UsersActions, ModalActions } from '../../actions';

const { getAllUsers, removeUser } = UsersActions;
const { showModal } = ModalActions;

function AvatarCell(value) {
    return (
        <img className="image" src={ value } />
    );
}

function StatusCell(value) {
    return value
        ? <span className="status-failure">Заблокирован</span>
        : <span className="status-done">Активен</span>;
}

function RoleCell(value) {
    return dict.roles[value];
}

class UsersView extends Component {
    constructor() {
        super();
        this.showUserModal = this.showUserModal.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    showUserModal(userId) {
        this.props.showModal('user', { userId });
    }

    removeUser(userId) {
        if (confirm('Вы действительно хотите удалить пользователя?')) {
            this.props.removeUser(userId);
        }
    }

    render() {
        const { list, fetching } = this.props.users;

        return (
            <Content title="Пользователи">
                <div className="content__header">
                    <div className="content__heading">Пользователи</div>
                </div>
                <Loader fetching={ fetching }>
                    <Table
                        edit={ this.showUserModal }
                        remove={ this.removeUser }
                        name="users"
                        data={ list }
                        page={ this.props.page }
                    >
                        <TableColumn
                            name="avatar"
                            header={ <TableHeader /> }
                            width="5"
                            cell={ AvatarCell }
                        />
                        <TableColumn
                            name="username"
                            header={ <TableHeader title="Имя" /> }
                            width="25"
                        />
                        <TableColumn
                            name="email"
                            header={ <TableHeader title="E-Mail" /> }
                            width="30"
                        />
                        <TableColumn
                            name="role"
                            header={ <TableHeader sorted title="Группа" /> }
                            width="20"
                            cell={ RoleCell }
                        />
                        <TableColumn
                            name="blocked"
                            header={ <TableHeader sorted title="Состояние" /> }
                            width="20"
                            cell={ StatusCell }
                        />
                    </Table>
                </Loader>
            </Content>
        );
    }
}

export default connect(
    (state, route) => ({
        users: state.users,
        page: parseInt(route.params.page) || 1
    }),
    { getAllUsers, removeUser, showModal }
)(UsersView);