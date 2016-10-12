import React, { Component } from 'react';
import { connect } from 'react-redux';

import { i18n } from '../../utils';
import Content from '../../components/blocks/content';
import Loader from '../../components/common/loader';
import { Table, TableHeader } from '../../components/common/table';
import { Button } from '../../components/common/form';
import { showModal } from '../../actions/modal';
import { removeTask } from '../../actions/tasks';

class TasksView extends Component {
    showTaskModal(taskId) {
        this.props.dispatch(showModal('task', { taskId }));
    }

    removeTask(taskId) {
        if (confirm('Вы действительно хотите удалить заявку?')) {
            this.props.dispatch(removeTask(taskId));
        }
    }

    renderActions(task) {
        if (this.props.user.role !== 'manager' ||
            (this.props.user.role === 'manager' &&
                this.props.user.id === task.createdBy.id)) {
            return (
                <div className="table__row-actions">
                    <div className="table__row-action" onClick={ this.showTaskModal.bind(this, task.id) }>
                        <i className="icon icon_edit" />
                    </div>
                    <div className="table__row-action" onClick={ this.removeTask.bind(this, task.id) }>
                        <i className="icon icon_delete" />
                    </div>
                </div>
            );
        }
    }

    renderList(data) {
        return data.map((task) => {
            return (
                <div className="table__row" key={ task.id }>
                    <div className="table__row-cell" style={ { width: '8%' } }>{ task.id }</div>
                    <div className="table__row-cell" style={ { width: '12%' } }>{ task.name }</div>
                    <div className="table__row-cell" style={ { width: '15%' } }>{ task.date }</div>
                    <div className="table__row-cell" style={ { width: '10%' } }>{ task.source }</div>
                    <div className="table__row-cell" style={ { width: '10%' } }>{ task.taskType }</div>
                    <div className="table__row-cell" style={ { width: '10%' } }>
                        <span className={ `status-${task.status}` }>{ i18n('statuses', task.status) }</span>
                    </div>
                    <div className="table__row-cell" style={ { width: '10%' } }>{ task.createdBy.username }</div>
                    <div className="table__row-cell" style={ { width: '10%' } }>{ task.serviceType }</div>
                    <div className="table__row-cell" style={ { width: '15%' } }>{ task.comment }</div>
                    { this.renderActions(task) }
                </div>
            );
        });
    }

    showTaskNewModal() {
        this.props.dispatch(showModal('taskNew'));
    }

    render() {
        const { list, fetching, sort, rowsPerPage } = this.props.tasks;

        return (
            <Content title="Заявки">
                <div className="content__header">
                    <div className="content__heading">Заявки</div>
                    <div className="content__actions">
                        <Button icon="quick-add" text="Добавить заявку" onClick={ this.showTaskNewModal.bind(this) } />
                    </div>
                </div>
                <Loader fetching={ fetching } list={ list }>
                    <Table
                        name="tasks"
                        path="/tasks"
                        data={ list }
                        rows={ rowsPerPage }
                        sort={ sort }
                        page={ this.props.page }
                        renderList={ this.renderList.bind(this) }
                    >
                        <TableHeader id="id" width="8" name="ID" />
                        <TableHeader width="12" name="Имя" />
                        <TableHeader id="date" width="15" name="Дата" />
                        <TableHeader width="10" name="Источник" />
                        <TableHeader width="10" name="Тип" />
                        <TableHeader id="status" width="10" name="Статус" />
                        <TableHeader width="10" name="Менеджер" />
                        <TableHeader width="10" name="Вид услуги" />
                        <TableHeader width="15" name="Комментарий" />
                    </Table>
                </Loader>
            </Content>
        );
    }
}

export default connect((state, route) => ({
    user: state.session.user,
    tasks: state.tasks,
    page: parseInt(route.params.pageId) || 1
}))(TasksView);