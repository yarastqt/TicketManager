import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Line, defaults as chartSettings } from 'react-chartjs-2';

import { Content } from 'components/blocks';

// Object.assign(chartSettings.global, {
//     defaultFontColor: '#4b606b',
//     defaultFontFamily: 'Roboto, Arial, sans-serif',
//     tooltips: {
//         ...chartSettings.global.tooltips,
//         backgroundColor: 'rgba(1, 1, 1, 0.85)',
//         // cornerRadius: '2'
//     },
//     // elements: {
//         // line: {
//             // ...chartSettings.global.elements.line,
//             // borderDash: [5, 1005]
//         // }
//     // }
//     // legend: {
//     //     display: false
//     // }
//     // responsive: false
// });

// chartSettings.global.elements.line.fill = false;

const data = {
    labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    datasets: [
        {
            label: 'Заявки отмененные',
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
            data: [65, 59, 80, 81, 56]
        },
        {
            label: 'Заявки выполненные',
            // fill: false,
            lineTension: 0.1,
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
            data: [10, 15, 80, 44, 52, 15, 70]
        },
    ]
    // xLabels: [],
    // yLabels: []
};


const options = {
    // title: {
    //     display: true,
    //     text: 'Custom Chart Title'
    // }
    // defaultFontColor: '#fa0'
    // default: {
    //     fontColor: '#fa0'
    // }
};

class StatisticsView extends Component {
    render() {

        // console.log(this.props.tasks.list);

        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                </div>
                <div className="profile">
                    {/*<Line data={data} options={ options } height={ 100 } />*/}
                </div>
            </Content>
        );
    }
}

export default connect(
    (state) => ({
        tasks: state.tasks
    })
)(StatisticsView);