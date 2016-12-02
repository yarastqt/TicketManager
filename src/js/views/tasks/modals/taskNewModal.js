import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { taskForm as validate } from 'validators/task';
import { DateUtil } from 'utils';
import { Input, Select, Textarea, Button, FormGroup, FormActions } from 'components/ui';
import { addTask } from 'actions/tasks';

class TasksNewModal extends Component {
    constructor() {
        super();
        this.addTask = this.addTask.bind(this);
    }

    addTask(task) {
        task = { ...task, date: DateUtil.toTS(task.date, task.time) };
        delete task.time;

        return this.props.addTask(task).then(() => {
            this.props.hideModal();
        });
    }

    render() {
        return (
            <div className="modal__in">
                <div className="modal__heading">Новая заявка</div>
                <form className="form" onSubmit={ this.props.handleSubmit(this.addTask) }>
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
                        <Button type="submit" view="action" icon="quick-add"
                            text={ this.props.submitting ? 'Добавление...' : 'Добавить' }
                            disabled={ this.props.pristine || this.props.submitting }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

TasksNewModal.defaultProps = {
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
        ]
    }
};

TasksNewModal = reduxForm({
    form: 'addTask',
    validate
})(TasksNewModal);

export default connect(
    (state) => ({
        initialValues: {
            date: DateUtil.currentDate(),
            time: DateUtil.currentTime()
        }
    }),
    { addTask }
)(TasksNewModal);