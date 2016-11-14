import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import dict from '../../constants/dict';
import { Content, Loader } from '../../components/blocks';
import { Table, TableColumn } from '../../components/ui';
import { UsersActions, ModalActions } from '../../actions';

const { getAllUsers, removeUser } = UsersActions;
const { showModal } = ModalActions;

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
        this.props.getAllUsers();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
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
                            width="5"
                            cell={ AvatarCell }
                        />
                        <TableColumn
                            name="username"
                            width="25"
                            title="Имя"
                        />
                        <TableColumn
                            name="email"
                            width="30"
                            title="E-Mail"
                        />
                        <TableColumn
                            name="role"
                            width="20"
                            title="Группа"
                            cell={ RoleCell }
                            sorted
                        />
                        <TableColumn
                            name="blocked"
                            width="20"
                            title="Состояние"
                            cell={ StatusCell }
                            sorted
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