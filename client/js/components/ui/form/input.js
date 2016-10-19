import React, { Component, PropTypes } from 'react';

import Control from './control';

class Input extends Control {
    state = {
        type: null
    };

    constructor() {
        super();
        this.changeType = this.changeType.bind(this);
    }

    changeType() {
        this.setState((state) => {
            if (!state.type || state.type === 'password') {
                return { type: 'text' };
            }

            return { type: 'password' };
        });
    }

    renderEye() {
        if (this.props.type === 'password') {
            return (
                <span className="input__eye" onClick={ this.changeType }>
                    {
                        (!this.state.type && this.props.type === 'password' || this.state.type === 'password')
                            ? <i className="icon icon_eye-close"></i>
                            : <i className="icon icon_eye-open"></i>
                    }
                </span>
            );
        }
    }

    renderControl() {
        const { type, name, value, disabled, autofocus, required } = this.props;

        return (
            <div className={ this.getClassName('input') }>
                { this.renderEye() }
                <input
                    type={ this.state.type || type }
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