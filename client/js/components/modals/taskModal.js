import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTaskById } from '../../selectors/tasks';
import { getFormData } from '../../utils';
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

            if (data.name && data.source && data.taskType) {
                this.props.updateTask(id, data);
            }
        };
    }

    render() {
        const { task, hideModal } = this.props;
        const { id, name, date, taskType, status, source, serviceType, comment } = task;

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать заявку</div>
                <form className="form" ref="form" onSubmit={ this.updateTask(id) }>
                    <Input type="text" name="name" label="Имя (ФИО / Компания)" value={ name } autofocus />
                    <div className="form__group">
                        <Input type="date" name="date" label="Дата" value={ date } />
                        <Input type="time" name="time" label="Время" />
                    </div>
                    <Input type="text" name="taskType" label="Тип (Звонок / Заявка)" value={ taskType } />
                    <Select name="status" label="Статус" value={ status }>
                        <option value="pending">В процессе</option>
                        <option value="failure">Отказ</option>
                        <option value="done">Выполнено</option>
                        <option value="canceled">Отменено</option>
                    </Select>
                    <Select name="source" label="Источник" value={ source }>
                        <option value="none" disabled>Выберите источник</option>
                        <option value="yandex">Яндекс</option>
                        <option value="google">Google</option>
                    </Select>
                    <Select name="serviceType" label="Вид услуги" value={ serviceType }>
                        <option value="none" disabled>Выберите вид услуги</option>
                        <option value="Переезд квартиры">Переезд квартиры</option>
                        <option value="Переезд офиса">Переезд офиса</option>
                    </Select>
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