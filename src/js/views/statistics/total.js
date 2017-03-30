import React from 'react';

const StatisticsTotal = ({ total }) => (
    <div className="statistics">
        <div className="statistics__item">
            <div className="statistics__item-title">
                <span className="status-new">Новых</span>
            </div>
            <div className="statistics__item-count">{ total.new }</div>
        </div>
        <div className="statistics__item">
            <div className="statistics__item-title">
                <span className="status-pending">В процессе</span>
            </div>
            <div className="statistics__item-count">{ total.pending }</div>
        </div>
        <div className="statistics__item">
            <div className="statistics__item-title">
                <span className="status-failure">Отказанных</span>
            </div>
            <div className="statistics__item-count">{ total.failure }</div>
        </div>
        <div className="statistics__item">
            <div className="statistics__item-title">
                <span className="status-done">Выполненных</span>
            </div>
            <div className="statistics__item-count">{ total.done }</div>
        </div>
        <div className="statistics__item">
            <div className="statistics__item-title">
                <span className="status-canceled">Отмененных</span>
            </div>
            <div className="statistics__item-count">{ total.canceled }</div>
        </div>
        <div className="statistics__item">
            <div className="statistics__item-title">Всего</div>
            <div className="statistics__item-count">{ total.count }</div>
        </div>
    </div>
);

export default StatisticsTotal;
