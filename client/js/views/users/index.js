import React, { Component } from 'react';
import { connect } from 'react-redux';

import { i18n } from '../../utils';
import Content from '../../components/blocks/content';
import Loader from '../../components/blocks/loader';
import { Table, TableColumn, TableHeader } from '../../components/ui';
import { UsersActions, ModalActions } from '../../actions';

const { getAllUsers } = UsersActions;
const { showModal } = ModalActions;

function AvatarCell({ value, width }) {
    return (
        <div className="table__row-cell" style={{ width: `${width}%` }}>
            <img className="image" src={ value } />
        </div>
    );
}

function StatusCell({ value, width }) {
    return (
        <div className="table__row-cell" style={{ width: `${width}%` }}>
            {
                value
                    ? <span className="status-failure">Заблокирован</span>
                    : <span className="status-done">Активен</span>
            }
        </div>
    );
}

class UsersView extends Component {
    componentWillMount() {
        this.props.getAllUsers();
    }

    // showUserModal(userId) {
    //     this.props.dispatch(showModal('user', { userId }));
    // }

    // removeUser(userId) {
    //     if (confirm('Вы действительно хотите удалить пользователя?')) {
    //         this.props.dispatch(removeUser(userId));
    //     }
    // }


    render() {
        const { list, fetching } = this.props.users;

        return (
            <Content title="Пользователи">
                <div className="content__header">
                    <div className="content__heading">Пользователи</div>
                </div>
                <Loader fetching={ fetching }>
                    <Table name="users" data={ list } page={ this.props.page }>
                        <TableColumn
                            name="avatar"
                            header={ <TableHeader /> }
                            width="5"
                            cell={ <AvatarCell /> }
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
                        />
                        <TableColumn
                            name="blocked"
                            header={ <TableHeader sorted title="Состояние" /> }
                            width="20"
                            cell={ <StatusCell /> }
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
    { getAllUsers, showModal }
)(UsersView);