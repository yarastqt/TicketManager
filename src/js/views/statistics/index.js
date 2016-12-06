import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, defaults as chartSettings } from 'react-chartjs-2';

import { Content, Loader } from 'components/blocks';
import { getTasks } from 'actions/tasks';
import StatisticsFilters from './filters';

Object.assign(chartSettings.global, {
    defaultFontColor: '#4b606b',
    defaultFontFamily: 'Roboto, Arial, sans-serif',
    tooltips: {
        ...chartSettings.global.tooltips,
        backgroundColor: 'rgba(1, 1, 1, 0.85)',
        // cornerRadius: '2'
    },
    // elements: {
        // line: {
            // ...chartSettings.global.elements.line,
            // borderDash: [5, 1005]
        // }
    // }
    // legend: {
    //     display: false
    // }
    // responsive: false
});

function makeData(points) {
    return {
        labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        datasets: [
            {
                label: 'Заявки в процессе',
                // fill: false,
                lineTension: 0.2,
                backgroundColor: 'rgba(0, 105, 255, 0.1)',
                borderColor: 'rgba(0, 105, 255, 1)',
                borderWidth: 1,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(0, 105, 255, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: 'rgba(0, 105, 255, 1)',
                pointHoverBorderColor: 'rgba(0, 105, 255, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: points.pending
            },
            {
                label: 'Заявки выполненные',
                // fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(25, 196, 172, 0.1)',
                borderColor: 'rgba(25, 196, 172, 1)',
                borderWidth: 1,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(25, 196, 172, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: 'rgba(25, 196, 172, 1)',
                pointHoverBorderColor: 'rgba(25, 196, 172, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: points.done
            },
        ]
    };
}

class StatisticsView extends Component {
    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        const chartData = makeData(this.props.tasks);

        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                </div>
                <StatisticsFilters />
                <div className="profile">
                    <Loader fetching={ this.props.fetching }>
                        <Line data={ chartData } height={ 100 } />
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

    // Устанавливаем конец текущего дня
    const end = new Date;
    const endDate = end.setHours(23, 59, 59, 999);

    // Устанавливаем начало дня
    const start = new Date(endDate - 604800000);
    const startDate = start.setHours(0, 0, 0, 0);

    // Дефолтный период неделя = конечная дата - начальная дата
    const period = endDate - startDate;

    // Шаг для сравнения
    const section = period / 7;

    // Начальные установки графика
    const pointsChart = {
        pending: [0, 0, 0, 0, 0, 0, 0], failure: [0, 0, 0, 0, 0, 0, 0],
        done: [0, 0, 0, 0, 0, 0, 0], canceled: [0, 0, 0, 0, 0, 0, 0]
    };

    tasks.forEach((task) => {
        for (let i = 1; i <= 7; i++) {
            let startEdge = startDate + section * i;
            let endEdge = startDate + section * (i + 1);

            if (task.date > startEdge && task.date <= endEdge) {
                if (task.status === 'pending') {
                    pointsChart['pending'][i]++;
                } else if (task.status === 'failure') {
                    pointsChart['failure'][i]++;
                } else if (task.status === 'done') {
                    pointsChart['done'][i]++;
                } else if (task.status === 'canceled') {
                    pointsChart['canceled'][i]++;
                }
            }
        }
    });

    return pointsChart;
}

function mapStateToProps(state) {
    const filters = state.filters['statistics'];
    const tasks = getChartPoints(state.tasks.list, filters);

    return {
        tasks: {},
        fetching: state.tasks.fetching
    };
}

export default connect(
    mapStateToProps,
    { getTasks }
)(StatisticsView);