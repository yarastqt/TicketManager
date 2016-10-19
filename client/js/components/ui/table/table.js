import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Portal from 'react-portal';

import { sortData, paginate } from '../../../selectors/table';
import TablePagination from './tablePagination';
import { TableActions } from '../../../actions';

class Table extends Component {
    state = {
        popup: {
            visible: false,
            props: null,
            position: {
                top: null,
                left: null
            }
        }
    };

    constructor() {
        super();
        this.openPopup = this.openPopup.bind(this);
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

    openPopup(id) {
        return (event) => {
            const bodyRect = document.body.getBoundingClientRect();
            const targetRect = event.target.getBoundingClientRect();

            this.setState({
                popup: {
                    visible: true,
                    props: id,
                    position: {
                        top: targetRect.top - bodyRect.top,
                        left: targetRect.right
                    }
                }
            });
        };
    }

    hidePopup() {
        this.setState({
            ...this.state,
            popup: { ...this.state.popup, visible: false }            
        });
    }

    handleEdit(id) {
        return () => {
            this.hidePopup();
            this.props.edit(id);
        };
    }

    handleRemove(id) {
        return () => {
            this.hidePopup();
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
                    <div className="table__row-action">
                        <div className="table__row-button" onClick={ this.openPopup(item.id) }></div>
                    </div>
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
        const { visible, props, position } = this.state.popup;
        const { children, total, page, rows, data } = this.props;

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
                        <div className="table__header-action"></div>
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
                <Portal closeOnEsc closeOnOutsideClick isOpened={ visible }>
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
    edit: PropTypes.func,
    remove: PropTypes.func,
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