import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, defaults as chartSettings } from 'react-chartjs-2';

import { defaultSettings, chartOptions } from 'constants/chart';
import { getChartPoints } from 'selectors/statistics';
import { Content, Loader } from 'components/blocks';
import { Button } from 'components/ui';
import { toggleVisibleFilters } from 'actions/filters';
import { getTickets } from 'actions/tickets';
import StatisticsFilters from './filters';

chartSettings.global = {
    ...chartSettings.global, ...defaultSettings
};

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
                    { Object.keys(this.props.data).length ? (
                        <div className="paper">
                            <Line data={ this.props.data } options={ chartOptions } height={ 94 } />
                        </div>
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
    (state) => ({
        visibleFilters: state.filters.statistics.visible,
        data: getChartPoints(state),
        tickets: state.tickets
    }),
    { getTickets, toggleVisibleFilters }
)(StatisticsView);
