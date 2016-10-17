import React, { Component, PropTypes } from 'react';

import Control from './control';

class Textarea extends Control {
    renderControl() {
        const { name, value } = this.props;

        return (
            <textarea
                name={ name }
                id={ name }
                defaultValue={ value }
                className="textarea"
                onFocus={ this.handleFocus.bind(this) }
                onBlur={ this.handleBlur.bind(this) }
            />
        );
    }
}

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default Textarea;