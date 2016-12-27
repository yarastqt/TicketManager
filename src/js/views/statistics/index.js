import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, defaults as chartSettings } from 'react-chartjs-2';

import { defaultSettings, chartOptions } from 'constants/chart';
import { getChartPoints } from 'selectors/statistics';
import { Content, Loader } from 'components/blocks';
import { getTickets } from 'actions/tickets';
import StatisticsFilters from './filters';

chartSettings.global = {
    ...chartSettings.global, ...defaultSettings
};

class StatisticsView extends Component {
    componentDidMount() {
        this.props.getTickets();
    }

    render() {
        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                </div>
                <StatisticsFilters />
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
        data: getChartPoints(state, state.filters['statistics']),
        tickets: state.tickets
    }),
    { getTickets }
)(StatisticsView);