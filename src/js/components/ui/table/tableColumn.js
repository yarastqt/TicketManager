import React, { PropTypes } from 'react';

const TableColumn = ({ value, width }) => (
    <div className="table__row-cell" style={{ width: `${width}%` }}>
        { value }
    </div>
);

TableColumn.propTypes = {
    /**
     * При маунтинге компонента свойства value нету
     * мы его прокидываем чуть позже, поэтому нельзя указать его в propTypes
     */
    // value: PropTypes.any.isRequired,
    width: PropTypes.string.isRequired
};

export default TableColumn;
