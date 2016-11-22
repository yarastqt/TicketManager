import React, { Component, PropTypes } from 'react';

import Control from './control';

class Textarea extends Control {
    constructor() {
        super();
        this.autoSelect = this.autoSelect.bind(this);
    }

    autoSelect() {
        this.refs.control.select();
    }

    renderControl() {
        const { name, value, readonly, autoselect } = this.props;

        return (
            <textarea
                ref="control"
                name={ name }
                id={ name }
                defaultValue={ value }
                className="textarea"
                onClick={ autoselect && this.autoSelect }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                readOnly={ readonly }
            />
        );
    }
}

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    readonly: PropTypes.bool,
    autoselect: PropTypes.bool
};

export default Textarea;