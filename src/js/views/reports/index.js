import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, defaults as chartSettings } from 'react-chartjs-2';

import { filterData } from 'selectors/table';
import { Content, Loader } from 'components/blocks';
import { getTasks } from 'actions/tasks';
import ReportsFilters from './filters';

Object.assign(chartSettings.global, {
    defaultFontColor: '#4b606b',
    defaultFontFamily: 'Roboto, Arial, sans-serif',
    tooltips: {
        ...chartSettings.global.tooltips,
        backgroundColor: 'rgba(1, 1, 1, 0.85)',
    },
});

const graphicsBaseSettings = {
    lineTension: 0.2,
    borderWidth: 1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 2,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 2,
    pointRadius: 2,
    pointHitRadius: 10
};

const graphics = {
    pending: {
        label: 'Заявки в процессе',
        backgroundColor: 'rgba(0, 105, 255, 0.1)',
        borderColor: 'rgba(0, 105, 255, 1)',
        pointBorderColor: 'rgba(0, 105, 255, 1)',
        pointHoverBackgroundColor: 'rgba(0, 105, 255, 1)',
        pointHoverBorderColor: 'rgba(0, 105, 255, 1)'
    },
    failure: {
        label: 'Заявки отказанные',
        backgroundColor: 'rgba(239, 71, 111, 0.1)',
        borderColor: 'rgba(239, 71, 111, 1)',
        pointBorderColor: 'rgba(239, 71, 111, 1)',
        pointHoverBackgroundColor: 'rgba(239, 71, 111, 1)',
        pointHoverBorderColor: 'rgba(239, 71, 111, 1)'
    },
    done: {
        label: 'Заявки выполненные',
        backgroundColor: 'rgba(25, 196, 172, 0.1)',
        borderColor: 'rgba(25, 196, 172, 1)',
        pointBorderColor: 'rgba(25, 196, 172, 1)',
        pointHoverBackgroundColor: 'rgba(25, 196, 172, 1)',
        pointHoverBorderColor: 'rgba(25, 196, 172, 1)'
    },
    canceled: {
        label: 'Заявки отмененные',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderColor: 'rgba(255, 193, 7, 1)',
        pointBorderColor: 'rgba(255, 193, 7, 1)',
        pointHoverBackgroundColor: 'rgba(255, 193, 7, 1)',
        pointHoverBorderColor: 'rgba(255, 193, 7, 1)'
    }
};

class ReportsView extends Component {
    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                </div>
                <ReportsFilters />
                <div className="profile">
                    <Loader fetching={ this.props.fetching }>
                        <Line data={ this.props.data } height={ 100 } />
                    </Loader>
                </div>
            </Content>
        );
    }
}


function getChartPoints(tasks, filters) {
    if (!tasks.length) {
        return {};
    }

    if (!filters.startDate || !filters.endDate) {
        return {};
    }

    const filteredData = filterData(tasks, filters);

    const endDate = filters.endDate;
    const startDate = filters.startDate - 604800000;

    // Дефолтный период неделя = конечная дата - начальная дата
    const period = endDate - startDate;

    // Шаг для сравнения
    const section = period / 7;

    // Начальные установки графика
    const pointsChart = {
        pending: [0, 0, 0, 0, 0, 0, 0], failure: [0, 0, 0, 0, 0, 0, 0],
        done: [0, 0, 0, 0, 0, 0, 0], canceled: [0, 0, 0, 0, 0, 0, 0]
    };

    filteredData.forEach((data) => {
        for (let i = 1; i <= 7; i++) {
            let startEdge = startDate + section * i;
            let endEdge = startDate + section * (i + 1);

            if (data.date > startEdge && data.date <= endEdge) {
                if (data.status === 'pending') {
                    pointsChart['pending'][i]++;
                } else if (data.status === 'failure') {
                    pointsChart['failure'][i]++;
                } else if (data.status === 'done') {
                    pointsChart['done'][i]++;
                } else if (data.status === 'canceled') {
                    pointsChart['canceled'][i]++;
                }
            }
        }
    });

    return {
        labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        datasets: [
            { ...graphicsBaseSettings, ...graphics.pending, data: pointsChart.pending },
            { ...graphicsBaseSettings, ...graphics.failure, data: pointsChart.failure },
            { ...graphicsBaseSettings, ...graphics.done, data: pointsChart.done },
            { ...graphicsBaseSettings, ...graphics.canceled, data: pointsChart.canceled }
        ]
    };
}

function mapStateToProps(state) {
    const filters = state.filters['statistics'];
    const data = getChartPoints(state.tasks.list, filters);

    return {
        data,
        fetching: state.tasks.fetching
    };
}

export default connect(
    mapStateToProps,
    { getTasks }
)(ReportsView);