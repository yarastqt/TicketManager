import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { getRange } from '../../../utils';

class TablePagination extends Component {
    renderRows() {
        const { changeRows, rows } = this.props;

        return (
            <div className="table__pagination-rows">
                <span>Записей на странице:</span>
                <div className="table__pagination-select">
                    <select className="table__pagination-select-control" defaultValue={ rows } onChange={ changeRows }>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        );
    }

    renderCounter() {
        const { total, rows, page } = this.props;
        const { start, end } = getRange(total, page, rows);

        return (
            <div className="table__pagination-counter">{ start }-{ end } из { total }</div>
        );
    }

    renderControls() {
        const { changePage, total, rows, page } = this.props;
        const totalPages = Math.ceil(total / rows);
        const prevClasses = classnames('table__pagination-control', {
            ['table__pagination-control_disabled']: page === 1
        });
        const nextClasses = classnames('table__pagination-control', {
            ['table__pagination-control_disabled']: page == totalPages
        });

        return (
            <div className="table__pagination-controls">
                <div className={ prevClasses } onClick={ page > 1 && changePage(page - 1) }>
                    <i className="icon icon_arrow-left"></i>
                </div>
                <div className={ nextClasses } onClick={ page < totalPages && changePage(page + 1) }>
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

TablePagination.propTypes = {
    changePage: PropTypes.func.isRequired,
    changeRows: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default TablePagination;