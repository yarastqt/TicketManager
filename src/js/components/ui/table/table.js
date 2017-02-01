import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Portal from 'react-portal';

import { filterData, sortData, paginate } from 'selectors/table';
import TableHeader from './tableHeader';
import TablePagination from './tablePagination';
import { changeSort, changeRows, changePage } from 'actions/table';

class Table extends Component {
    constructor() {
        super();
        this.state = {
            popup: {
                visible: false, props: null, position: {
                    top: null, left: null
                }
            }
        };
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeRows = this.changeRows.bind(this);
    }

    componentDidMount() {
        this.redirectToIndexIfEmpty(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.redirectToIndexIfEmpty(nextProps);
    }

    redirectToIndexIfEmpty(props) {
        if (props.total > 0 && !props.data.length) {
            this.changePage(1)();
        }
    }

    openPopup(id) {
        return (event) => {
            const bodyRect = document.body.getBoundingClientRect();
            const targetRect = event.target.getBoundingClientRect();

            this.setState({
                popup: {
                    visible: true, props: id, position: {
                        top: targetRect.top - bodyRect.top,
                        left: targetRect.right
                    }
                }
            });
        };
    }

    closePopup() {
        this.setState({
            popup: { ...this.state.popup, visible: false }
        });
    }

    handleEdit(id) {
        return () => {
            this.closePopup();
            this.props.edit(id);
        };
    }

    handleRemove(id) {
        return () => {
            this.closePopup();
            this.props.remove(id);
        };
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
        this.props.changeRows(parseInt(event.target.value), this.props.name);
    }

    renderCells(data) {
        return this.props.children.map((item) => {
            let value = data[item.props.name];

            if (item.props.cell && item.props.link && data[item.props.link]) {
                value = item.props.cell(data[item.props.name], data[item.props.link]);
            } else if (item.props.cell) {
                value = item.props.cell(data[item.props.name]);
            }

            return React.cloneElement(item, {
                width: item.props.width, key: item.props.name, value
            });
        });
    }

    renderRows() {
        return this.props.data.map((item) => {
            return (
                <div className="table__row" key={ item.id }>
                    { this.renderCells(item) }
                    <div className="table__row-action">
                        { this.renderActions(item) }
                    </div>
                </div>
            );
        });
    }

    renderActions(data) {
        if (this.props.user.role !== 'manager' || this.props.user.role === 'manager' && this.props.user.id === data.createdBy.id) {
            return (
                <div className="table__row-button" onClick={ this.openPopup(data.id) }></div>
            );
        }
    }

    renderHeaders() {
        return this.props.children.map((item) => {
            return (
                <TableHeader { ...item.props } key={ item.props.name } sort={ this.props.sort } changeSort={ this.changeSort } />
            );
        });
    }

    render() {
        const { visible, props, position } = this.state.popup;
        const { children, isFilters, total, page, rows, data } = this.props;

        if (!data.length) {
            return (
                <div className="content__message">
                    <div className="content__message-icon">
                        <i className={ isFilters ? 'icon icon_search' : 'icon icon_list' }></i>
                    </div>
                    <span className="content__message-text">
                        { isFilters ? 'Совпадений не найдено' : 'Список пуст' }
                    </span>
                </div>
            );
        }

        return (
            <div className="table">
                <div className="table__in">
                    <div className="table__header">
                        { this.renderHeaders() }
                        <div className="table__header-action"></div>
                    </div>
                    <div className="table__body">
                        { this.renderRows() }
                    </div>
                </div>
                <TablePagination
                    changePage={ this.changePage } changeRows={ this.changeRows }
                    total={ total } page={ page } rows={ rows }
                />
                <Portal closeOnEsc closeOnOutsideClick isOpened={ visible } onClose={ this.closePopup }>
                    <div className="popup" style={{ left: position.left, top: position.top }}>
                        <div className="popup__button" onClick={ this.handleEdit(props) }>
                            <i className="icon icon_edit"></i>
                            <span className="popup__button-text">Редактировать</span>
                        </div>
                        <div className="popup__button" onClick={ this.handleRemove(props) }>
                            <i className="icon icon_delete"></i>
                            <span className="popup__button-text">Удалить</span>
                        </div>
                    </div>
                </Portal>
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
    edit: PropTypes.func,
    isFilters: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    remove: PropTypes.func,
    rows: PropTypes.number.isRequired,
    sort: PropTypes.shape({
        desc: PropTypes.bool.isRequired,
        key: PropTypes.string.isRequired
    }),
    total: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
    const { name, data, page } = props;
    const filters = state.filters[name] && state.filters[name].list;
    const { rows, sort } = state.table[name];
    const isFilters = filters && Object.keys(filters).length ? true : false;

    let total = data.length;
    let processedData = filters ? filterData(data, filters) : data;

    if (total !== processedData.length) {
        total = processedData.length;
    }

    processedData = sortData(processedData, sort);
    processedData = paginate(processedData, page, rows);

    return {
        data: processedData,
        user: state.session.user,
        isFilters, total, rows, sort
    };
}

export default connect(
    mapStateToProps,
    { changeSort, changeRows, changePage }
)(Table);
