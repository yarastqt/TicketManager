import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../components/blocks';

class StatisticsView extends Component {
    render() {
        return (
            <Content title="Статистика">
                <div className="content__header">
                    <div className="content__heading">Статистика</div>
                </div>
                <div className="chart">
                    chart
                </div>
            </Content>
        );
    }
}

export default connect(
    (state) => ({

    })
)(StatisticsView);