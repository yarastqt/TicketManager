import React, { Component, PropTypes } from 'react';
import CN from 'classnames';

class TableHeader extends Component {
    static propTypes = {
        sorted: PropTypes.bool,
        name: PropTypes.string,
        changeSort: PropTypes.func,
        sort: PropTypes.shape({
            desc: PropTypes.bool.isRequired,
            key: PropTypes.string.isRequired
        }),
        width: PropTypes.string.isRequired,
        title: PropTypes.string
    };

    renderSortedIcon() {
        if (this.props.name === this.props.sort.key) {
            return this.props.sort.desc ? (
                <i className="icon icon_arrow-downward"></i>
            ) : (
                <i className="icon icon_arrow-upward"></i>
            );
        }

        return (
            <i className="icon icon_arrow-downward"></i>
        );
    }

    render() {
        const { sorted, name, changeSort, sort, width, title } = this.props;
        const headerCellClasses = CN({
            'table__header-cell': true,
            'table__header-cell_sorted': sorted,
            'table__header-cell_active': name === sort.key
        });

        return (
            <div className={ headerCellClasses } style={{ width: `${width}%` }} onClick={ sorted && changeSort(name) }>
                <span>{ title }</span>
                { sorted && this.renderSortedIcon() }
            </div>
        );
    }
}

export default TableHeader;
