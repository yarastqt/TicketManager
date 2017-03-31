import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DateUtil } from 'utils';
import dict from 'constants/dict';
import { Content, Loader } from 'components/blocks';
import { Table, TableColumn, Button } from 'components/ui';
import { toggleVisibleFilters } from 'actions/filters';
import { getTickets, removeTicket } from 'actions/tickets';
import { showModal } from 'actions/modal';
import TicketsFilters from './filters';

function StatusCell(value) {
    return (
        <span className={ `status-${value}` }>
            { dict.statuses[value] }
        </span>
    );
}

function TaskSourceCell(value, linkValue) {
    if (linkValue === 'Заявка') {
        return (
            <a className="link" href={ value } target="_blank" rel="noopener noreferrer">{ value }</a>
        );
    }

    return value;
}

function ManagerCell(value) {
    return value.username;
}

function DateCell(value) {
    return DateUtil.fromTS(value).getDate(true);
}

class TicketsView extends Component {
    constructor() {
        super();
        this.showTicketAddModal = this.showTicketAddModal.bind(this);
        this.showTicketEditModal = this.showTicketEditModal.bind(this);
        this.removeTicket = this.removeTicket.bind(this);
        this.toggleVisibleFilters = this.toggleVisibleFilters.bind(this);
    }

    componentDidMount() {
        this.props.getTickets();
    }

    showTicketAddModal() {
        this.props.showModal('TicketAddModal');
    }

    showTicketEditModal(ticketId) {
        this.props.showModal('TicketEditModal', { ticketId });
    }

    removeTicket(ticketId) {
        if (confirm('Вы действительно хотите удалить заявку?')) {
            this.props.removeTicket(ticketId);
        }
    }

    toggleVisibleFilters() {
        this.props.toggleVisibleFilters('tickets');
    }

    render() {
        const {
            visibleFilters,
            tickets,
            page
        } = this.props;

        return (
            <Content title="Заявки">
                <div className="content__header">
                    <div className="content__heading">Заявки</div>
                    <div className="content__actions">
                        <Button type="button" view="pseudo" icon="filter" active={ visibleFilters } onClick={ this.toggleVisibleFilters } />
                        <Button type="button" view="action" icon="quick-add" text="Добавить заявку" onClick={ this.showTicketAddModal } />
                    </div>
                </div>
                <TicketsFilters visible={ visibleFilters } />
                <Loader fetching={ tickets.fetching }>
                    <Table name="tickets" data={ tickets.list } page={ page } edit={ this.showTicketEditModal } remove={ this.removeTicket }>
                        <TableColumn name="id" width="8" title="ID" sorted />
                        <TableColumn name="status" width="10" title="Статус" cell={ StatusCell } sorted />
                        <TableColumn name="date" width="10" title="Дата" cell={ DateCell } sorted />
                        <TableColumn name="source" width="10" title="Источник" sorted />
                        <TableColumn name="taskType" width="10" title="Тип" sorted />
                        <TableColumn name="taskSource" width="16" title="Источник заявки" cell={ TaskSourceCell } link="taskType" />
                        <TableColumn name="createdBy" width="10" title="Менеджер" cell={ ManagerCell } />
                        <TableColumn name="serviceType" title="Вид услуги" width="10" sorted />
                        <TableColumn name="comment" width="16" title="Комментарий" />
                    </Table>
                </Loader>
            </Content>
        );
    }
}

export default connect(
    (state, props) => ({
        visibleFilters: state.filters.tickets.visible,
        tickets: state.tickets,
        page: parseInt(props.params.page, 10) || 1
    }),
    { getTickets, removeTicket, showModal, toggleVisibleFilters }
)(TicketsView);
