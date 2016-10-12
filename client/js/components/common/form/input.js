import React, { Component, PropTypes } from 'react';

import Control from './control';

class Input extends Control {
    renderControl() {
        const { type, name, value, disabled, autofocus, required } = this.props;

        return (
            <div className={ this.getClassName('input') }>
                <input
                    type={ type }
                    name={ name }
                    id={ name }
                    defaultValue={ value }
                    className="input__control"
                    autoComplete="off"
                    onFocus={ this.handleFocus.bind(this) }
                    onBlur={ this.handleBlur.bind(this) }
                    disabled={ disabled }
                    autoFocus={ autofocus }
                    required={ required }
                />
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool
};

export default Input;