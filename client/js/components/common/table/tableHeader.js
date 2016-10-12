import React, { Component } from 'react';

import { toggleTableSort } from '../../../actions/table';

class TableHeader extends Component {
    handleSort(sortKey, tableName) {
        this.props.dispatch(toggleTableSort(sortKey, tableName));
    }

    renderIcon(id, sort) {
        if (id) {
            if (sort.key === id) {
                return sort.desc
                    ? <i className="icon icon_arrow-downward"></i>
                    : <i className="icon icon_arrow-upward"></i>;
            }

            return <i className="icon icon_arrow-downward"></i>;
        }
    }

    render() {
        const { id, width, name, sort, tableName, dispatch } = this.props;

        return (
            <div
                className="table__header-cell"
                style={ { width: `${width}%` } }
                onClick={ id && this.handleSort.bind(this, id, tableName) }
            >
                <span>{ name }</span> { this.renderIcon(id, sort) }
            </div>
        );
    }
}

export default TableHeader;