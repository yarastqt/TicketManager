import React, { PropTypes } from 'react';

function Loader({ fetching, list, children }) {
    if (fetching) {
        return (
            <div className="loader">
                <div className="loader__circles">
                    <span className="loader__circle"></span>
                    <span className="loader__circle"></span>
                    <span className="loader__circle"></span>
                </div>
                <div className="loader__text">Загрузка данных...</div>
            </div>
        );
    }

    if (list && !list.length) {
        return (
            <div className="empty-list">
                <i className="empty-list__icon" />
                <span className="empty-list__text">Список пуст</span>
            </div>
        );
    }

    return React.Children.only(children);
}

Loader.propTypes = {
    fetching: PropTypes.bool.isRequired,
    list: PropTypes.array,
    children: PropTypes.element.isRequired
};

export default Loader;