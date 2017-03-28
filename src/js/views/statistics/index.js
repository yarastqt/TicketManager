import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getStatistics } from 'selectors/statistics';
import { Content, Loader } from 'components/blocks';
import { Table, TableColumn, Button } from 'components/ui';
import { toggleVisibleFilters } from 'actions/filters';
import { getTickets } from 'actions/tickets';
import StatisticsFilters from './filters';

class StatisticsView extends Component {
    constructor() {
        super();
        this.toggleVisibleFilters = this.toggleVisibleFilters.bind(this);
    }

    componentDidMount() {
        this.props.getTickets();
    }

    toggleVisibleFilters() {
        this.props.toggleVisibleFilters('statistics');
    }

    render() {
        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                    <div className="content__actions">
                        <Button type="button" view="pseudo" icon="filter" active={ this.props.visibleFilters }
                            onClick={ this.toggleVisibleFilters }
                        />
                    </div>
                </div>
                <StatisticsFilters visible={ this.props.visibleFilters } />
                <Loader fetching={ this.props.tickets.fetching }>
                    { this.props.data.length ? (
                        <Table name="statistics" data={ this.props.data } page={ this.props.page } ignoreFilter>
                            <TableColumn
                                name="date" width="25" title="Дата"
                                sorted
                            />
                            <TableColumn
                                name="new" width="15" title="Новая"
                            />
                            <TableColumn
                                name="pending" width="15" title="В процессе"
                            />
                            <TableColumn
                                name="failure" width="15" title="Отказ"
                            />
                            <TableColumn
                                name="done" width="15" title="Выполнено"
                            />
                            <TableColumn
                                name="canceled" width="15" title="Отменено"
                            />
                        </Table>
                    ) : (
                        <div className="content__message">
                            <div className="content__message-icon">
                                <i className="icon icon_search"></i>
                            </div>
                            <span className="content__message-text">Выберите фильтры</span>
                        </div>
                    ) }
                </Loader>
            </Content>
        );
    }
}

export default connect(
    (state, props) => ({
        visibleFilters: state.filters.statistics.visible,
        data: getStatistics(state),
        tickets: state.tickets,
        page: parseInt(props.params.page) || 1
    }),
    { getTickets, toggleVisibleFilters }
)(StatisticsView);
