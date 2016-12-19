import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DateUtil } from 'utils';
import dict from 'constants/dict';
import { Content, Loader } from 'components/blocks';
import { Table, TableColumn, Button } from 'components/ui';
import TicketsFilters from './filters';
import { getTickets, removeTicket } from 'actions/tickets';
import { showModal } from 'actions/modal';

function StatusCell(value) {
    return (
        <span className={ `status-${value}` }>
            { dict.statuses[value] }
        </span>
    );
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
        this.state = { visibleFilters: false };
        this.showTicketAddModal = this.showTicketAddModal.bind(this);
        this.showTicketEditModal = this.showTicketEditModal.bind(this);
        this.removeTicket = this.removeTicket.bind(this);
        this.toggleVisibleFilters = this.toggleVisibleFilters.bind(this);
    }

    componentDidMount() {
        this.props.getTickets();
    }

    showTicketAddModal() {
        this.props.showModal('tickets/modals/ticketAddModal');
    }

    showTicketEditModal(ticketId) {
        this.props.showModal('tickets/modals/ticketEditModal', { ticketId });
    }

    removeTicket(ticketId) {
        if (confirm('Вы действительно хотите удалить заявку?')) {
            this.props.removeTicket(ticketId);
        }
    }

    toggleVisibleFilters() {
        this.setState({ visibleFilters: !this.state.visibleFilters });
    }

    render() {
        return (
            <Content title="Заявки">
                <div className="content__header">
                    <div className="content__heading">Заявки</div>
                    <div className="content__actions">
                        <Button type="button" view="pseudo" icon="filter" active={ this.state.visibleFilters }
                            onClick={ this.toggleVisibleFilters }
                        />
                        <Button type="button" view="action" icon="quick-add" text="Добавить заявку"
                            onClick={ this.showTicketAddModal }
                        />
                    </div>
                </div>
                <TicketsFilters
                    visible={ this.state.visibleFilters }
                />
                <Loader fetching={ this.props.tickets.fetching }>
                    <Table
                        name="tickets" data={ this.props.tickets.list } page={ this.props.page }
                        edit={ this.showTicketEditModal } remove={ this.removeTicket }
                    >
                        <TableColumn
                            name="id" width="8" title="ID"
                            sorted 
                        />
                        <TableColumn
                            name="status" width="10" title="Статус"
                            cell={ StatusCell } sorted
                        />
                        <TableColumn
                            name="date" width="10" title="Дата"
                            cell={ DateCell } sorted
                        />
                        <TableColumn
                            name="source" width="10" title="Источник"
                            sorted
                        />
                        <TableColumn
                            name="taskType" width="10" title="Тип"
                            sorted
                        />
                        <TableColumn
                            name="taskSource" width="16" title="Источник заявки"
                        />
                        <TableColumn
                            name="createdBy" width="10" title="Менеджер"
                            cell={ ManagerCell }
                        />
                        <TableColumn
                            name="serviceType" title="Вид услуги" width="10"
                            sorted
                        />
                        <TableColumn
                            name="comment" width="16" title="Комментарий"
                        />
                    </Table>
                </Loader>
            </Content>
        );
    }
}

export default connect(
    (state, props) => ({
        user: state.session.user,
        tickets: state.tickets,
        page: parseInt(props.params.page) || 1
    }),
    { getTickets, removeTicket, showModal }
)(TicketsView);