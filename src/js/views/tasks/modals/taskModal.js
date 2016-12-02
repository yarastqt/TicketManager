import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { taskForm as validate } from 'validators/task';
import { getTaskById } from 'selectors/tasks';
import { DateUtil } from 'utils';
import { Input, Select, Textarea, Button, FormGroup, FormActions } from 'components/ui';
import { updateTask } from 'actions/tasks';

class TaskModal extends Component {
    constructor() {
        super();
        this.updateTask = this.updateTask.bind(this);
    }

    updateTask(task) {
        task = { ...task, date: DateUtil.toTS(task.date, task.time) };
        delete task.createdBy;
        delete task.time;

        return this.props.updateTask(task).then(() => {
            this.props.hideModal();
        });
    }

    render() {
        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать заявку</div>
                <form className="form" onSubmit={ this.props.handleSubmit(this.updateTask) }>
                    <Field name="name" type="text" label="Имя (ФИО / Компания)"
                        component={ Input }
                    />
                    <FormGroup>
                        <Field name="date" type="date" label="Дата"
                            component={ Input }
                        />
                        <Field name="time" type="time" label="Время"
                            component={ Input }
                        />
                    </FormGroup>
                    <Field name="status" label="Статус"
                        component={ Select } options={ this.props.options.statuses }
                    />
                    <Field name="source" label="Источник"
                        component={ Select } options={ this.props.options.sources } custom
                    />
                    <FormGroup>
                        <Field name="taskType" label="Тип"
                            component={ Select } options={ this.props.options.taskTypes } custom
                        />
                        <Field name="taskSource" type="text" label="Источник заявки"
                            component={ Input }
                        />
                    </FormGroup>
                    <Field name="serviceType" label="Вид услуги"
                        component={ Select } options={ this.props.options.serviceTypes } custom
                    />
                    <Field name="comment" label="Комментарий"
                        component={ Textarea }
                    />
                    <FormActions position="right">
                        <Button type="button" view="pseudo" text="Отмена"
                            onClick={ this.props.hideModal }
                        />
                        <Button type="submit" view="action" icon="update"
                            text={ this.props.submitting ? 'Обновление...' : 'Обновить' }
                            disabled={ this.props.pristine || this.props.submitting }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

TaskModal.defaultProps = {
    options: {
        sources: [
            { value: 'Яндекс РСЯ', label: 'Яндекс РСЯ' },
            { value: 'Яндекс Реклама', label: 'Яндекс Реклама' },
            { value: 'Яндекс Поиск', label: 'Яндекс Поиск' },
            { value: 'Google КМС', label: 'Google КМС' },
            { value: 'Google Реклама', label: 'Google Реклама' },
            { value: 'Google Поиск', label: 'Google Поиск' },
            { value: 'Неизвестно', label: 'Неизвестно' }
        ],
        taskTypes: [
            { value: 'Заявка', label: 'Заявка' },
            { value: 'Звонок', label: 'Звонок' },
            { value: 'Почта', label: 'Почта' }
        ],
        serviceTypes: [
            { value: 'Переезд квартиры', label: 'Переезд квартиры' }
        ],
        statuses: [
            { value: 'pending', label: 'В процессе' },
            { value: 'failure', label: 'Отказ' },
            { value: 'done', label: 'Выполнено' },
            { value: 'canceled', label: 'Отменено' }
        ]
    }
};

TaskModal = reduxForm({
    form: 'updateTask',
    validate
})(TaskModal);

function mapStateToProps(state, props) {
    const task = getTaskById(state.tasks.list, props.taskId);
    const TS = DateUtil.fromTS(task.date);

    return {
        initialValues: {
            ...task,
            date: TS.getDate(),
            time: TS.getTime()
        }
    };
}

export default connect(
    mapStateToProps,
    { updateTask }
)(TaskModal);