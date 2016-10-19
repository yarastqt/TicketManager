import React, { Component } from 'react';
import { connect } from 'react-redux';

import dict from '../../constants/dict';
import { Content, Loader } from '../../components/blocks';
import { Table, TableColumn, TableHeader, Button } from '../../components/ui';
import { TasksActions, ModalActions } from '../../actions';

const { getAllTasks, removeTask } = TasksActions;
const { showModal } = ModalActions;

function StatusCell({ value, width }) {
    return (
        <div className="table__row-cell" style={{ width: `${width}%` }}>
            <span className={ `status-${value}` }>{ dict.statuses[value] }</span>
        </div>
    );
}

function ManagerCell({ value, width }) {
    return (
        <div className="table__row-cell" style={{ width: `${width}%` }}>
            { value.username }
        </div>
    );
}

class TasksView extends Component {
    constructor() {
        super();
        this.showTaskNewModal = this.showTaskNewModal.bind(this);
        this.showTaskModal = this.showTaskModal.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    componentWillMount() {
        this.props.getAllTasks();
    }

    showTaskNewModal() {
        this.props.showModal('taskNew');
    }

    showTaskModal(taskId) {
        this.props.showModal('task', { taskId });
    }

    removeTask(taskId) {
        if (confirm('Вы действительно хотите удалить заявку?')) {
            this.props.removeTask(taskId);
        }
    }

    render() {
        const { page, tasks } = this.props;
        const { list, fetching } = tasks;

        return (
            <Content title="Заявки">
                <div className="content__header">
                    <div className="content__heading">Заявки</div>
                    <div className="content__actions">
                        <Button icon="quick-add" text="Добавить заявку" onClick={ this.showTaskNewModal } />
                    </div>
                </div>
                <Loader fetching={ fetching }>
                    <Table
                        edit={ this.showTaskModal }
                        remove={ this.removeTask }
                        name="tasks"
                        data={ list }
                        page={ page }
                    >
                        <TableColumn
                            name="id"
                            header={ <TableHeader sorted title="ID" /> }
                            width="8"
                        />
                        <TableColumn
                            name="name"
                            header={ <TableHeader title="Имя" /> }
                            width="12"
                        />
                        <TableColumn
                            name="date"
                            header={ <TableHeader sorted title="Дата" /> }
                            width="15"
                        />
                        <TableColumn
                            name="source"
                            header={ <TableHeader sorted title="Источник" /> }
                            width="10"
                        />
                        <TableColumn
                            name="taskType"
                            header={ <TableHeader sorted title="Тип" /> }
                            width="10"
                        />
                        <TableColumn
                            name="status"
                            header={ <TableHeader sorted title="Статус" /> }
                            width="10"
                            cell={ <StatusCell /> }
                        />
                        <TableColumn
                            name="createdBy"
                            header={ <TableHeader title="Менеджер" /> }
                            width="10"
                            cell={ <ManagerCell /> }
                        />
                        <TableColumn
                            name="serviceType"
                            header={ <TableHeader sorted title="Вид услуги" /> }
                            width="10"
                        />
                        <TableColumn
                            name="comment"
                            header={ <TableHeader title="Комментарий" /> }
                            width="15"
                        />
                    </Table>
                </Loader>
            </Content>
        );
    }
}

export default connect(
    (state, props) => ({
        user: state.session.user,
        tasks: state.tasks,
        page: parseInt(props.params.page) || 1
    }),
    { getAllTasks, removeTask, showModal }
)(TasksView);