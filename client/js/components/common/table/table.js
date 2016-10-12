import React, { Component } from 'react';
import { connect } from 'react-redux';

import TablePagination from './tablePagination';
import { changeTableRows, paginateTable } from '../../../actions/table';

class Table extends Component {
    handlePaginate(page) {
        let nextPage = this.props.path;
        if (page !== 1) {
            nextPage += `/page/${page}`;
        }

        this.props.dispatch(paginateTable(nextPage));
    }

    handleRows(event) {
        this.props.dispatch(changeTableRows(event.target.value));
    }

    sortData(data, sortKey, sortDesc) {
        const multiplier = sortDesc ? -1 : 1;

        return data.sort((a, b) => {
            const aValue = a[sortKey] || 0;
            const bValue = b[sortKey] || 0;

            return aValue > bValue
                ? multiplier
                : (aValue < bValue ? -multiplier : 0);
        });
    }

    getRange(total, rows, page) {
        const start = rows * (page - 1) + 1;
        const end = Math.min(page * rows, total);

        return { start, end };
    }

    paginate(data, rows, page) {
        const { start, end } = this.getRange(data.length, rows, page);

        return data.slice(start - 1, end);
    }

    renderHeader(children, sort) {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                sort,
                tableName: this.props.name,
                dispatch: this.props.dispatch
            });
        });
    }

    render() {
        const { children, data, rows, sort, page } = this.props;
        let processedData = this.sortData(data, sort.key, sort.desc);

        if (data && !processedData.length) {
            this.handlePaginate(1);
        }

        processedData = this.paginate(processedData, rows, page);

        return (
            <div className="table">
                <div className="table__in">
                    <div className="table__header">
                        { this.renderHeader(children, sort) }
                    </div>
                    { this.props.renderList(processedData) }
                    <TablePagination
                        handlePaginate={ this.handlePaginate.bind(this) }
                        handleRows={ this.handleRows.bind(this) }
                        getRange={ this.getRange }
                        total={ data.length }
                        rows={ rows }
                        page={ page }
                    />
                </div>
            </div>
        );
    }
}

export default connect((state) => ({

}))(Table);