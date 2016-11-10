import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTaskById } from '../../selectors/tasks';
import { getFormData, compareTaskObject, datez } from '../../utils';
import { Input, Select, Textarea, Button } from '../../components/ui';
import { TasksActions } from '../../actions';

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
            data.date = datez.toTS(data.date, data.time);

            delete data.time;

            if (compareTaskObject(this.props.task, data)) {
                this.props.hideModal();
            } else if (data.name && data.source && data.taskType) {
                this.props.updateTask(id, data);
            }
        };
    }

    render() {
        const { task, hideModal } = this.props;
        const { id, name, taskType, status, source, serviceType, comment } = task;
        const date = datez.fromTS(task.date);

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать заявку</div>
                <form className="form" ref="form" onSubmit={ this.updateTask(id) }>
                    <Input type="text" name="name" label="Имя (ФИО / Компания)" value={ name } autofocus />
                    <div className="form__group">
                        <Input type="date" name="date" label="Дата" value={ date.date() } />
                        <Input type="time" name="time" label="Время" value={ date.time() } />
                    </div>
                    <Select name="taskType" label="Тип" value={ taskType } options={[
                        { value: 'application', label: 'Заявка' },
                        { value: 'call', label: 'Звонок' },
                        { value: 'mail', label: 'Почта' }
                    ]} custom />
                    <Select name="status" label="Статус" value={ status } options={[
                        { value: 'pending', label: 'В процессе' },
                        { value: 'failure', label: 'Отказ' },
                        { value: 'done', label: 'Выполнено' },
                        { value: 'canceled', label: 'Отменено' }
                    ]} />
                    <Select name="source" label="Источник" value={ source } options={[
                        { value: 'yandex rcya', label: 'Яндекс РСЯ' },
                        { value: 'yandex', label: 'Яндекс' },
                        { value: 'google cms', label: 'Google КМС' },
                        { value: 'google', label: 'Google' }
                    ]} custom />
                    <Select name="serviceType" label="Вид услуги" value={ serviceType } options={[
                        { value: 'Переезд квартиры', label: 'Переезд квартиры' }
                    ]} custom />
                    <Textarea name="comment" label="Комментарий" value={ comment } />
                    <div className="form__actions">
                        <Button icon="update" text="Обновить" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({
        task: getTaskById(state.tasks.list, props.taskId)
    }),
    { updateTask }
)(TaskModal);