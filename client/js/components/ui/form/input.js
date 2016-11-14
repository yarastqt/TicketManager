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

        setTimeout(() => {
            this.refs.control.focus();
        }, 0);
    }

    renderEye() {
        const iconClasses = !this.state.type && this.props.type === 'password' || this.state.type === 'password'
            ? 'icon icon_eye-close'
            : 'icon icon_eye-open';

        if (this.props.type === 'password') {
            return (
                <span className="input__eye" onClick={ this.changeType }>
                    <i className={ iconClasses }></i>
                </span>
            );
        }
    }

    renderControl() {
        const { type, name, value, placeholder, disabled, autofocus, required } = this.props;

        return (
            <div className={ this.getClassName('input') }>
                { this.renderEye() }
                <input
                    ref="control"
                    type={ this.state.type || type }
                    name={ name }
                    id={ name }
                    defaultValue={ value }
                    placeholder={ placeholder }
                    className="input__control"
                    autoComplete="off"
                    onFocus={ this.handleFocus }
                    onBlur={ this.handleBlur }
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
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool
};

export default Input;