import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, defaults as chartSettings } from 'react-chartjs-2';

import { Content } from 'components/blocks';
import { getTasks } from 'actions/tasks';

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
            data: [65, 59, 80, 81, 56, 0, 0]
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

class StatisticsView extends Component {
    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                </div>
                <div className="profile">
                    <Line data={data} height={ 100 } />
                </div>
            </Content>
        );
    }
}


function getTasksByLastWeek(tasks) {
    if (!tasks.length) {
        return {};
    }

    const endWeek = Date.now() + 86400000;
    const unknown = endWeek - 604800000;
    const section = (endWeek - unknown) / 7;

    const startWeek = endWeek - 604800000 - section;

    const data = {
        pending: [0, 0, 0, 0, 0, 0, 0],
        failure: [0, 0, 0, 0, 0, 0, 0],
        done: [0, 0, 0, 0, 0, 0, 0],
        canceled: [0, 0, 0, 0, 0, 0, 0]
    };

    const result = tasks.reduce((container, task) => {

        // console.log(task);

        // if (task.date >= startWeek && task.date <= endWeek) {
        //     for (let i = 1; i <= 7; i++) {
        //         console.log('found+', i);
        //     }
        // }


        // for (let i = 1; i <= 7; i++) {

            let i = 2;

            let startEdge = null;
            let endEdge = startWeek * section * i;

            if (i === 1) {
                startEdge = startWeek;
            } else {
                startWeek + section * (i - 1);
            }

            if (task.date >= startEdge && task.date <= endEdge) {
                if (task.status === 'failure') {
                    console.log('fail');
                }
            }


            // if (task.date >= startWeek && task.date <= startWeek + section * 2) {

// let i = ;
            // if (task.date >= startWeek + section * i && task.date <= startWeek + section * i) {

                // if (task.status === 'pending') {
                //     container['pending'][i - 1]++;
                // } else if (task.status === 'failure') {
                //     container['failure'][i - 1]++;
                // } else if (task.status === 'done') {
                //     container['done'][i - 1]++;
                // } else if (task.status === 'canceled') {
                //     container['canceled'][i - 1]++;
                // }
                // console.log(i);


            // }
        // }

        // console.log(task);



        return container;
    }, data);



    // console.log(result);

    // const endResult = result.reduce((container, task) => {
    //     switch (task.status) {
    //         case 'pending':
    //             container['pending']++;
    //             break;

    //         case 'failure':
    //             container['failure']++;
    //             break;

    //         case 'done':
    //             container['done']++;
    //             break;

    //         case 'canceled':
    //             container['canceled']++;
    //             break;
    //     }

    //     return container;
    // }, initial);

    // return endResult;
}


export default connect(
    (state) => ({
        tasks: getTasksByLastWeek(state.tasks.list)
    }),
    { getTasks }
)(StatisticsView);