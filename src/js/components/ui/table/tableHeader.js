import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TableHeader extends Component {
    renderSortedIcon() {
        if (this.props.name === this.props.sort.key) {
            if (this.props.sort.desc) {
                return <i className="icon icon_arrow-downward"></i>;
            }

            return <i className="icon icon_arrow-upward"></i>;
        }

        return <i className="icon icon_arrow-downward"></i>;
    }

    render() {
        const { sorted, name, changeSort, sort, width, title } = this.props;
        const headerCellClasses = classnames('table__header-cell', {
            'table__header-cell_sorted': name === sort.key
        });

        return (
            <div className={ headerCellClasses } style={{ width: `${width}%` }} onClick={ sorted && changeSort(name) }>
                <span>
                    { title }
                </span>
                { sorted && this.renderSortedIcon() }
            </div>
        );
    }
}

TableHeader.propTypes = {
    name: PropTypes.string,
    sort: PropTypes.shape({
        desc: PropTypes.bool.isRequired,
        key: PropTypes.string.isRequired
    }),
    sorted: PropTypes.bool,
    toggleSort: PropTypes.func
};

export default TableHeader;