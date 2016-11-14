import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import { YDate } from '../../utils';
import dict from '../../constants/dict';
import { Content, Loader } from '../../components/blocks';
import { Table, TableColumn, Button } from '../../components/ui';
import TaskTableFilters from './filters';
import { TasksActions, ModalActions } from '../../actions';

const { getAllTasks, removeTask } = TasksActions;
const { showModal } = ModalActions;

function TypeCell(value) {
    return dict.types[value];
}

function StatusCell(value) {
    return (
        <span className={ `status-${value}` }>
            { dict.statuses[value] }
        </span>
    );
}

function ManagerCell(value) {
    return value.username;
}

function DateCell(value) {
    return YDate.fromTS(value).date(true);
}

class TasksView extends Component {
    state = {
        visibleFilters: false
    };

    constructor() {
        super();
        this.showTaskNewModal = this.showTaskNewModal.bind(this);
        this.showTaskModal = this.showTaskModal.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.toggleVisibleFilters = this.toggleVisibleFilters.bind(this);
    }

    componentDidMount() {
        this.props.getAllTasks();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
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

    toggleVisibleFilters() {
        this.setState({ visibleFilters: !this.state.visibleFilters });
    }

    render() {
        const { page, tasks } = this.props;
        const { list, fetching } = tasks;

        return (
            <Content title="Заявки">
                <div className="content__header">
                    <div className="content__heading">Заявки</div>
                    <div className="content__actions">
                        <Button icon="filter" view="pseudo" onClick={ this.toggleVisibleFilters } />
                        <Button icon="quick-add" text="Добавить заявку" onClick={ this.showTaskNewModal } />
                    </div>
                </div>
                <TaskTableFilters visible={ this.state.visibleFilters } />
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
                            width="8"
                            title="ID"
                            sorted
                        />
                        <TableColumn
                            name="name"
                            width="12"
                            title="Имя"
                        />
                        <TableColumn
                            name="date"
                            width="15"
                            title="Дата"
                            cell={ DateCell }
                            sorted
                        />
                        <TableColumn
                            name="source"
                            width="10"
                            title="Источник"
                            sorted
                        />
                        <TableColumn
                            name="taskType"
                            width="10"
                            title="Тип"
                            cell={ TypeCell }
                            sorted
                        />
                        <TableColumn
                            name="status"
                            width="10"
                            title="Статус"
                            cell={ StatusCell }
                            sorted
                        />
                        <TableColumn
                            name="createdBy"
                            width="10"
                            title="Менеджер"
                            cell={ ManagerCell }
                        />
                        <TableColumn
                            name="serviceType"
                            title="Вид услуги"
                            width="10"
                            sorted
                        />
                        <TableColumn
                            name="comment"
                            width="15"
                            title="Комментарий"
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