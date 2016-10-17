import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { sortData, paginate } from '../../../selectors/table';
import TablePagination from './tablePagination';
import { TableActions } from '../../../actions';

class Table extends Component {
    constructor() {
        super();
        this.changeSort = this.changeSort.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeRows = this.changeRows.bind(this);
    }

    componentWillMount() {
        this.redirectIfEmpty();
    }

    componentWillReceiveProps() {
        this.redirectIfEmpty();
    }

    redirectIfEmpty() {
        if (this.props.total > 0 && !this.props.data.length) {
            this.changePage(1)();
        }
    }

    changeSort(field) {
        return () => {
            this.props.changeSort(field, this.props.name);
        };
    }

    changePage(page) {
        return () => {
            let nextPage = `/${this.props.name}`;

            if (page !== 1) {
                nextPage += `/page/${page}`;
            }

            this.props.changePage(nextPage);
        };
    }

    changeRows(event) {
        this.props.changeRows(event.target.value, this.props.name);
    }

    renderCells(data) {
        return this.props.children.map((item, key) => {
            const element = item.props.cell || item;

            return React.cloneElement(element, {
                value: data[item.props.name],
                width: item.props.width,
                key
            });
        });
    }

    renderRows() {
        return this.props.data.map((item, key) => {
            return (
                <div className="table__row" key={ key }>
                    { this.renderCells(item) }
                </div>
            );
        });
    }

    renderHeaders() {
        return this.props.children.map((item, key) => {
            return React.cloneElement(item.props.header, {
                name: item.props.name,
                changeSort: this.changeSort,
                sort: this.props.sort,
                width: item.props.width,
                key
            });
        });
    }

    render() {
        const { children, total, page, rows, data } = this.props;
        const { props } = children;

        if (!data.length) {
            return (
                <div className="empty-list">
                    <i className="empty-list__icon" />
                    <span className="empty-list__text">Список пуст</span>
                </div>
            );
        }

        return (
            <div className="table">
                <div className="table__in">
                    <div className="table__header">
                        { this.renderHeaders() }
                    </div>
                    <div className="table__body">
                        { this.renderRows() }
                    </div>
                    <TablePagination
                        changePage={ this.changePage }
                        changeRows={ this.changeRows }
                        total={ total }
                        page={ page }
                        rows={ rows }
                    />
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    changePage: PropTypes.func.isRequired,
    changeRows: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    data: PropTypes.array,
    name: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    sort: PropTypes.shape({
        desc: PropTypes.bool.isRequired,
        key: PropTypes.string.isRequired
    })
};

function mapStateToProps(state, props) {
    const { name, data, page } = props;
    const { rows, sort } = state.table[name];
    let processedData = sortData(data, sort);
        processedData = paginate(processedData, page, rows);

    return {
        total: props.data.length,
        data: processedData,
        page,
        rows,
        sort
    };
}

export default connect(
    mapStateToProps,
    { ...TableActions }
)(Table);