import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import dict from 'constants/dict';
import { Content, Loader } from 'components/blocks';
import { Table, TableColumn } from 'components/ui';
import { getUsers, removeUser } from 'actions/users';
import { showModal } from 'actions/modal';

function AvatarCell(value) {
    return (
        <img className="image" src={ value } />
    );
}

function StatusCell(value) {
    if (value) {
        return (
            <span className="status-failure">Заблокирован</span>
        );
    }

    return (
        <span className="status-done">Активен</span>
    );
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
        this.props.getUsers();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    showUserModal(userId) {
        this.props.showModal('users/modals/userModal', { userId });
    }

    removeUser(userId) {
        if (confirm('Вы действительно хотите удалить пользователя?')) {
            this.props.removeUser(userId);
        }
    }

    render() {
        return (
            <Content title="Пользователи">
                <div className="content__header">
                    <div className="content__heading">Пользователи</div>
                </div>
                <Loader fetching={ this.props.users.fetching }>
                    <Table
                        name="users" data={ this.props.users.list } page={ this.props.page }
                        edit={ this.showUserModal } remove={ this.removeUser }
                    >
                        <TableColumn
                            name="avatar" width="5"
                            cell={ AvatarCell }
                        />
                        <TableColumn
                            name="username" width="25" title="Имя"
                        />
                        <TableColumn
                            name="email" width="30" title="E-Mail"
                        />
                        <TableColumn
                            name="role" width="20" title="Группа"
                            cell={ RoleCell } sorted
                        />
                        <TableColumn
                            name="blocked" width="20" title="Состояние"
                            cell={ StatusCell } sorted
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
    { getUsers, removeUser, showModal }
)(UsersView);