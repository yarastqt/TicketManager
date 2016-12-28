import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { ticketForm as validate } from 'validators/ticket';
import { getTicketById } from 'selectors/tickets';
import { DateUtil } from 'utils';
import { Input, Select, Textarea, Button, Form, FormGroup, FormActions } from 'components/ui';
import { updateTicket } from 'actions/tickets';

class TicketEditModal extends Component {
    constructor() {
        super();
        this.updateTicket = this.updateTicket.bind(this);
    }

    updateTicket(ticket) {
        ticket = { ...ticket, date: DateUtil.toTS(ticket.date, ticket.time) };
        delete ticket.createdBy;
        delete ticket.time;

        return this.props.updateTicket(ticket).then(() => {
            this.props.hideModal();
        });
    }

    render() {
        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать заявку</div>
                <Form onSubmit={ this.props.handleSubmit(this.updateTicket) } submitting={ this.props.submitting }>
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
                </Form>
            </div>
        );
    }
}

TicketEditModal.defaultProps = {
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

TicketEditModal = reduxForm({
    form: 'ticketEditForm',
    enableReinitialize: true,
    validate
})(TicketEditModal);

function mapStateToProps(state, props) {
    const ticket = getTicketById(state, props);
    const TS = DateUtil.fromTS(ticket.date);

    return {
        initialValues: {
            ...ticket,
            date: TS.getDate(),
            time: TS.getTime()
        }
    };
}

export default connect(
    mapStateToProps,
    { updateTicket }
)(TicketEditModal);