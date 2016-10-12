import React, { Component } from 'react';
import classNames from 'classnames';

class TablePagination extends Component {
    renderRows() {
        const { handleRows, rows } = this.props;

        return (
            <div className="table__pagination-rows">
                <span>Записей на странице:</span>
                <div className="table__pagination-select">
                    <select className="table__pagination-select-control" defaultValue={ rows } onChange={ handleRows }>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        );
    }

    renderCounter() {
        const { getRange, total, rows, page } = this.props;
        const { start, end } = getRange(total, rows, page);

        return (
            <div className="table__pagination-counter">{ start }-{ end } из { total }</div>
        );
    }

    renderControls() {
        const { handlePaginate, total, rows, page } = this.props;
        const totalPages = Math.ceil(total / rows);
        const controlClassName = 'table__pagination-control';
        const controlClassNameDisabled = 'table__pagination-control_disabled';
        const prevClassName = classNames(controlClassName, { [controlClassNameDisabled]: page === 1 });
        const nextClassName = classNames(controlClassName, { [controlClassNameDisabled]: page == totalPages });

        return (
            <div className="table__pagination-controls">
                <div className={ prevClassName } onClick={ page > 1 && handlePaginate.bind(this, page - 1) }>
                    <i className="icon icon_arrow-left"></i>
                </div>
                <div className={ nextClassName } onClick={ page < totalPages && handlePaginate.bind(this, page + 1) }>
                    <i className="icon icon_arrow-right"></i>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="table__pagination">
                { this.renderRows() }
                { this.renderCounter() }
                { this.renderControls() }
            </div>
        );
    }
}

export default TablePagination;