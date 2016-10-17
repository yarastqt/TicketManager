import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormData } from '../../utils';
import { Input, Select, Textarea, Button } from '../../components/ui';
import { TasksActions } from '../../actions';

const { addTask } = TasksActions;

class TasksNewModal extends Component {
    constructor() {
        super();
        this.addTask = this.addTask.bind(this);
    }

    addTask(event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);

        if (data.name && data.source && data.taskType) {
            this.props.addTask(data);
        }
    }

    render() {
        return (
            <div className="modal__in">
                <div className="modal__heading">Новая заявка</div>
                <form className="form" ref="form" onSubmit={ this.addTask }>
                    <Input type="text" name="name" label="Имя (ФИО / Компания)" required autofocus />
                    <div className="form__group">
                        <Input type="date" name="date" label="Дата" />
                        <Input type="time" name="time" label="Время" />
                    </div>
                    <Input type="text" name="taskType" label="Тип (Звонок / Заявка)" required />
                    <Select name="source" label="Источник" value="" required>
                        <option value="" disabled>Выберите источник</option>
                        <option value="yandex">Яндекс</option>
                        <option value="google">Google</option>
                    </Select>
                    <Select name="serviceType" label="Вид услуги" value="" required>
                        <option value="" disabled>Выберите вид услуги</option>
                        <option value="Переезд квартиры">Переезд квартиры</option>
                        <option value="Переезд офиса">Переезд офиса</option>
                    </Select>
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