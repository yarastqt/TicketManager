import React, { Component } from 'react';
import { connect } from 'react-redux';

import { i18n } from '../../utils';
import Content from '../../components/blocks/content';
import Loader from '../../components/common/loader';
import { Table, TableHeader } from '../../components/common/table';
import { showModal } from '../../actions/modal';
import { removeUser } from '../../actions/users';

class UsersView extends Component {
    showUserModal(userId) {
        this.props.dispatch(showModal('user', { userId }));
    }

    removeUser(userId) {
        if (confirm('Вы действительно хотите удалить пользователя?')) {
            this.props.dispatch(removeUser(userId));
        }
    }

    renderList(data) {
        return data.map((user) => {
            return (
                <div className="table__row" key={ user.id }>
                    <div className="table__row-cell" style={ { width: '30%' } }>
                        <img className="image" src={ user.avatar } />
                        <span>{ user.username }</span>
                    </div>
                    <div className="table__row-cell" style={ { width: '30%' } }>{ user.email }</div>
                    <div className="table__row-cell" style={ { width: '20%' } }>{ i18n('roles', user.role) }</div>
                    <div className="table__row-cell" style={ { width: '20%' } }>
                        {
                            user.blocked
                                ? <span className="status-failure">Заблокирован</span>
                                : <span className="status-done">Активен</span>
                        }
                    </div>
                    <div className="table__row-actions">
                        <div className="table__row-action" onClick={ this.showUserModal.bind(this, user.id) }>
                            <i className="icon icon_edit" />
                        </div>
                        <div className="table__row-action" onClick={ this.removeUser.bind(this, user.id) }>
                            <i className="icon icon_delete" />
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        const { users, location } = this.props;
        const { list, fetching, sort, rowsPerPage } = users;

        return (
            <Content title="Пользователи">
                <div className="content__header">
                    <div className="content__heading">Пользователи</div>
                </div>
                <Loader fetching={ this.props.users.fetching }>
                    <Table
                        name="users"
                        path="/users"
                        data={ list }
                        rows={ rowsPerPage }
                        sort={ sort }
                        page={ this.props.page }
                        renderList={ this.renderList.bind(this) }
                    >
                        <TableHeader width="30" name="Имя" />
                        <TableHeader width="30" name="Email" />
                        <TableHeader id="role" width="20" name="Роль" />
                        <TableHeader id="blocked" width="20" name="Состояние" />
                    </Table>
                </Loader>
            </Content>
        );
    }
}

export default connect((state, route) => ({
    users: state.users,
    page: parseInt(route.params.pageId) || 1
}))(UsersView);