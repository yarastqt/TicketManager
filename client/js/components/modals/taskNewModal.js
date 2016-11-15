import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormData, YDate } from 'utils';
import { Input, Select, Textarea, Button } from 'components/ui';
import { TasksActions } from 'actions';

const { addTask } = TasksActions;

class TasksNewModal extends Component {
    constructor() {
        super();
        this.addTask = this.addTask.bind(this);
    }

    addTask(event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);
        data.date = YDate.toTS(data.date, data.time);

        delete data.time;

        if (data.name && data.source && data.taskType) {
            this.props.addTask(data);
        }
    }

    render() {
        return (
            <div className="modal__in">
                <div className="modal__heading">Новая заявка</div>
                <form className="form" ref="form" onSubmit={ this.addTask }>
                    <Input type="text" name="name" label="Имя (ФИО / Компания)" required />
                    <div className="form__group">
                        <Input type="date" name="date" label="Дата" value={ YDate.currentDate() } />
                        <Input type="time" name="time" label="Время" value={ YDate.currentTime() } />
                    </div>
                    <Select name="taskType" label="Тип" options={[
                        { value: 'Заявка', label: 'Заявка' },
                        { value: 'Звонок', label: 'Звонок' },
                        { value: 'Почта', label: 'Почта' }
                    ]} custom />
                    <Input type="text" name="task" label="Источник заявки" required />
                    <Select name="source" label="Источник" options={[
                        { value: 'Яндекс РСЯ', label: 'Яндекс РСЯ' },
                        { value: 'Яндекс', label: 'Яндекс' },
                        { value: 'Google КМС', label: 'Google КМС' },
                        { value: 'Google', label: 'Google' }
                    ]} custom />
                    <Select name="serviceType" label="Вид услуги" options={[
                        { value: 'Переезд квартиры', label: 'Переезд квартиры' }
                    ]} custom />
                    <Textarea name="comment" label="Комментарий" />
                    <div className="form__actions">
                        <Button icon="quick-add" text="Добавить" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    { addTask }
)(TasksNewModal);