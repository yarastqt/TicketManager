import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { ticketForm as validate } from 'validators/ticket';
import { ticketSelectOptions } from 'constants/select';
import { getSuggests } from 'selectors/suggests';
import { DateUtil } from 'utils';
import { Input, Select, Textarea, Button, Form, FormGroup, FormActions } from 'components/ui';
import { addTicket } from 'actions/tickets';

class TicketAddModal extends Component {
    constructor() {
        super();
        this.addTicket = this.addTicket.bind(this);
    }

    getTaskSourceSuggests() {
        switch (this.props.taskType) {
            case 'Заявка':
                return this.props.suggests.taskSource.ticket;
            case 'Звонок':
                return this.props.suggests.taskSource.call;
            case 'Почта':
                return this.props.suggests.taskSource.mail;
        }

        return null;
    }

    addTicket(ticket) {
        ticket = {
            ...ticket,
            date: DateUtil.toTS(ticket.date, ticket.time)
        };
        delete ticket.time;

        return this.props.addTicket(ticket).then(() => {
            this.props.hideModal();
        });
    }

    render() {
        const {
            handleSubmit,
            submitting,
            pristine,
            suggests,
            options,
            taskType,
            hideModal
        } = this.props;

        return (
            <div className="modal__in">
                <div className="modal__heading">Новая заявка</div>
                <Form onSubmit={ handleSubmit(this.addTicket) } submitting={ submitting }>
                    <Field name="name" type="text" label="Имя (ФИО / Компания)" component={ Input } suggests={ suggests.name } />
                    <FormGroup>
                        <Field name="date" type="date" label="Дата" component={ Input } />
                        <Field name="time" type="time" label="Время" component={ Input } />
                    </FormGroup>
                    <Field name="status" label="Статус" component={ Select } options={ options.statuses } />
                    <Field name="source" label="Источник" component={ Select } options={ options.sources } custom />
                    <FormGroup>
                        <Field name="taskType" label="Тип" component={ Select } options={ options.taskTypes } custom />
                        <Field name="taskSource" type="text" label="Источник заявки" component={ Input } suggests={ this.getTaskSourceSuggests() } disabled={ taskType } />
                    </FormGroup>
                    <Field name="serviceType" label="Вид услуги" component={ Select } options={ options.serviceTypes } custom />
                    <Field name="comment" label="Комментарий" component={ Textarea } />
                    <FormActions position="right">
                        <Button type="button" view="pseudo" text="Отмена" onClick={ hideModal } />
                        <Button type="submit" view="action" icon="quick-add" text={ submitting ? 'Добавление...' : 'Добавить' } disabled={ pristine || submitting } />
                    </FormActions>
                </Form>
            </div>
        );
    }
}

TicketAddModal.defaultProps = {
    ...ticketSelectOptions
};

TicketAddModal = reduxForm({
    form: 'ticketAddForm',
    validate
})(TicketAddModal);

const formSelector = formValueSelector('ticketAddForm');

export default connect(
    (state) => ({
        initialValues: {
            date: DateUtil.getCurrentDate(),
            time: DateUtil.getCurrentTime(),
            status: 'pending'
        },
        suggests: getSuggests(state),
        taskType: formSelector(state, 'taskType')
    }),
    { addTicket }
)(TicketAddModal);
