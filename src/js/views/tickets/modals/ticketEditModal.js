import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { ticketForm as validate } from 'validators/ticket';
import { ticketSelectOptions } from 'constants/select';
import { getTicketById } from 'selectors/tickets';
import { getSuggests } from 'selectors/suggests';
import { DateUtil } from 'utils';
import { Input, Select, Textarea, Button, Form, FormGroup, FormActions } from 'components/ui';
import { updateTicket } from 'actions/tickets';

class TicketEditModal extends Component {
    constructor() {
        super();
        this.updateTicket = this.updateTicket.bind(this);
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

    updateTicket(ticket) {
        ticket = {
            ...ticket,
            date: DateUtil.toTS(ticket.date, ticket.time)
        };
        delete ticket.createdBy;
        delete ticket.time;

        return this.props.updateTicket(ticket).then(() => {
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
            hideModal
        } = this.props;

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать заявку</div>
                <Form onSubmit={ handleSubmit(this.updateTicket) } submitting={ submitting }>
                    <Field name="name" type="text" label="Имя (ФИО / Компания)" component={ Input } suggests={ suggests.name } />
                    <FormGroup>
                        <Field name="date" type="date" abel="Дата" component={ Input } />
                        <Field name="time" type="time" label="Время" component={ Input } />
                    </FormGroup>
                    <Field name="status" label="Статус" component={ Select } options={ options.statuses } />
                    <Field name="source" label="Источник" component={ Select } options={ options.sources } custom />
                    <FormGroup>
                        <Field name="taskType" label="Тип" component={ Select } options={ options.taskTypes } custom />
                        <Field name="taskSource" type="text" label="Источник заявки" component={ Input } suggests={ this.getTaskSourceSuggests() } />
                    </FormGroup>
                    <Field name="serviceType" label="Вид услуги" component={ Select } options={ options.serviceTypes } custom />
                    <Field name="comment" label="Комментарий" component={ Textarea } />
                    <FormActions position="right">
                        <Button type="button" view="pseudo" text="Отмена" onClick={ hideModal } />
                        <Button type="submit" view="action" icon="update" text={ submitting ? 'Обновление...' : 'Обновить' } disabled={ pristine || submitting } />
                    </FormActions>
                </Form>
            </div>
        );
    }
}

TicketEditModal.defaultProps = {
    ...ticketSelectOptions
};

TicketEditModal = reduxForm({
    form: 'ticketEditForm',
    enableReinitialize: true,
    validate
})(TicketEditModal);

const formSelector = formValueSelector('ticketEditForm');

function mapStateToProps(state, props) {
    const ticket = getTicketById(state, props);
    const TS = DateUtil.fromTS(ticket.date);

    return {
        initialValues: {
            ...ticket,
            date: TS.getDate(),
            time: TS.getTime()
        },
        suggests: getSuggests(state),
        taskType: formSelector(state, 'taskType')
    };
}

export default connect(
    mapStateToProps,
    { updateTicket }
)(TicketEditModal);
