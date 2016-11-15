import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

import { Content } from 'components/blocks';


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Заявки',
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
        data: [65, 59, 80, 81, 56, 55, 40]
    }]
};

class StatisticsView extends Component {
    render() {
        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                </div>
                <div className="profile">
                    <Line data={data} height={ 110 } />
                </div>
            </Content>
        );
    }
}

export default connect(
    (state) => ({

    })
)(StatisticsView);