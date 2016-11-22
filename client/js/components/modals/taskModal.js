import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTaskById } from 'selectors/tasks';
import { getFormData, compareTaskObject, YDate } from 'utils';
import { Input, Select, Textarea, Button } from 'components/ui';
import { TasksActions } from 'actions';

const { updateTask } = TasksActions;

class TaskModal extends Component {
    constructor() {
        super();
        this.updateTask = this.updateTask.bind(this);
    }

    updateTask(id) {
        return (event) => {
            event.preventDefault();
            const data = getFormData(this.refs.form);
            data.date = YDate.toTS(data.date, data.time);

            delete data.time;

            if (compareTaskObject(this.props.task, data)) {
                this.props.hideModal();
            } else if (data.name && data.source && data.taskType) {
                this.props.updateTask(id, data);
            }
        };
    }

    render() {
        const {
            task: { id, name, taskType, taskSource, status, source, serviceType, comment },
            options: { sources, taskTypes, serviceTypes, statuses },
        } = this.props;

        const date = YDate.fromTS(this.props.task.date);

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать заявку</div>
                <form className="form" ref="form" onSubmit={ this.updateTask(id) }>
                    <Input type="text" name="name" label="Имя (ФИО / Компания)" value={ name } />
                    <div className="form__group">
                        <Input type="date" name="date" label="Дата" value={ date.date() } />
                        <Input type="time" name="time" label="Время" value={ date.time() } />
                    </div>
                    <Select name="status" label="Статус" value={ status } options={ statuses } required />
                    <Select name="source" label="Источник" value={ source } options={ sources } custom required />
                    <div className="form__group">
                        <Select name="taskType" label="Тип" value={ taskType } options={ taskTypes } custom required />
                        <Input type="text" name="taskSource" label="Источник заявки" value={ taskSource } required />
                    </div>
                    <Select name="serviceType" label="Вид услуги" value={ serviceType } options={ serviceTypes } custom />
                    <Textarea name="comment" label="Комментарий" value={ comment } />
                    <div className="form__actions">
                        <Button icon="update" text="Обновить" />
                    </div>
                </form>
            </div>
        );
    }
}

TaskModal.defaultProps = {
    options: {
        sources: [
            { value: 'Яндекс РСЯ', label: 'Яндекс РСЯ' },
            { value: 'Яндекс', label: 'Яндекс' },
            { value: 'Google КМС', label: 'Google КМС' },
            { value: 'Google', label: 'Google' }
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

export default connect(
    (state, props) => ({
        task: getTaskById(state.tasks.list, props.taskId)
    }),
    { updateTask }
)(TaskModal);