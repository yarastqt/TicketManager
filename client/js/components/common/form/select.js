import React, { Component, PropTypes } from 'react';

import Control from './control';

class Select extends Control {
    renderControl() {
        const { name, value, children, required } = this.props;

        return (
            <div className="select">
                <select
                    name={ name }
                    id={ name }
                    defaultValue={ value }
                    className="select__control"
                    onFocus={ this.handleFocus.bind(this) }
                    onBlur={ this.handleBlur.bind(this) }
                    required={ required }
                >
                    { children }
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    // value: PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Select;