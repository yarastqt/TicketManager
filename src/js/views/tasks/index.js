import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import { DateUtil } from 'utils';
import dict from 'constants/dict';
import { Content, Loader } from 'components/blocks';
import { Table, TableColumn, Button } from 'components/ui';
import TaskTableFilters from './filters';
import { getTasks, removeTask } from 'actions/tasks';
import { showModal } from 'actions/modal';

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
    return DateUtil.fromTS(value).getDate(true);
}

class TasksView extends Component {
    constructor() {
        super();
        this.state = { visibleFilters: false };
        this.showTaskNewModal = this.showTaskNewModal.bind(this);
        this.showTaskModal = this.showTaskModal.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.toggleVisibleFilters = this.toggleVisibleFilters.bind(this);
    }

    componentDidMount() {
        this.props.getTasks();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return shallowCompare(this, nextProps, nextState);
    // }

    showTaskNewModal() {
        this.props.showModal('tasks/modals/taskNewModal');
    }

    showTaskModal(taskId) {
        this.props.showModal('tasks/modals/taskModal', { taskId });
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
        return (
            <Content title="Заявки">
                <div className="content__header">
                    <div className="content__heading">Заявки</div>
                    <div className="content__actions">
                        <Button type="button" view="pseudo" icon="filter" active={ this.state.visibleFilters }
                            onClick={ this.toggleVisibleFilters }
                        />
                        <Button type="button" view="action" icon="quick-add" text="Добавить заявку"
                            onClick={ this.showTaskNewModal }
                        />
                    </div>
                </div>
                <TaskTableFilters
                    visible={ this.state.visibleFilters }
                />
                <Loader fetching={ this.props.tasks.fetching }>
                    <Table
                        name="tasks" data={ this.props.tasks.list } page={ this.props.page }
                        edit={ this.showTaskModal } remove={ this.removeTask }
                    >
                        <TableColumn
                            name="id" width="8" title="ID"
                            sorted 
                        />
                        <TableColumn
                            name="status" width="10" title="Статус"
                            cell={ StatusCell } sorted
                        />
                        <TableColumn
                            name="date" width="10" title="Дата"
                            cell={ DateCell } sorted
                        />
                        <TableColumn
                            name="source" width="10" title="Источник"
                            sorted
                        />
                        <TableColumn
                            name="taskType" width="10" title="Тип"
                            sorted
                        />
                        <TableColumn
                            name="taskSource" width="16" title="Источник заявки"
                        />
                        <TableColumn
                            name="createdBy" width="10" title="Менеджер"
                            cell={ ManagerCell }
                        />
                        <TableColumn
                            name="serviceType" title="Вид услуги" width="10"
                            sorted
                        />
                        <TableColumn
                            name="comment" width="16" title="Комментарий"
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
    { getTasks, removeTask, showModal }
)(TasksView);