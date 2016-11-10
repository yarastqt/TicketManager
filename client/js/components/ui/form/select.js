import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Control from './control';

class Select extends Control {
    state = {
        value: null,
        type: 'select'
    };

    constructor() {
        super();
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.cancelInput = this.cancelInput.bind(this);
        this.clearSelect = this.clearSelect.bind(this);
    }

    componentWillMount() {
        if (this.props.value) {
            if (!this.props.options.some(({ value }) => value === this.props.value)) {
                this.setState({ value: this.props.value, type: 'input' });
            } else {
                this.setState({ ...this.state, value: this.props.value });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    changeOption(event) {
        if (event.target.value === 'other') {
            this.setState({ ...this.state, value: null, type: 'input' });
            setTimeout(() => {
                this.refs.control.focus();
            }, 0);
        } else {
            this.setState({ ...this.state, value: event.target.value });
        }
    }

    cancelInput() {
        this.setState({ ...this.state, value: null, type: 'select' });
        setTimeout(() => {
            this.refs.control.focus();
        }, 0);
    }

    clearSelect() {
        this.setState({ ...this.state, value: null });
        this.props.onClear(this.props.name);
        this.refs.control.focus();
    }

    renderClearControl() {
        if (this.props.clearable && this.state.value) {
            return (
                <span className="select__clear" onClick={ this.clearSelect }>
                    <i className="icon icon_close"></i>
                </span>
            );
        }
    }

    renderSelect({ name, placeholder, options, required, custom }) {
        return (
            <div className="select">
                { this.renderClearControl() }
                <select ref="control" name={ name } id={ name } value={ this.state.value || '' } className="select__control" onChange={ this.changeOption } onFocus={ this.handleFocus } onBlur={ this.handleBlur } required={ required }>
                    { (placeholder || !this.state.value) && <option value="" disabled>{ placeholder || '' }</option> }
                    { options.map(({ value, label }, key) =>
                        <option value={ value } key={ key }>{ label }</option>
                    ) }
                    { custom && <option value="other">Другое</option> }
                </select>
            </div>
        );
    }

    renderInput({ name, placeholder, options, required }) {
        return (
            <div className={ this.getClassName('input') }>
                <span className="input__cancel" onClick={ this.cancelInput }>
                    <i className="icon icon_close"></i>
                </span>
                <input ref="control" type="text" name={ name } id={ name } defaultValue={ this.state.value || '' } className="input__control" autoComplete="off" onFocus={ this.handleFocus } onBlur={ this.handleBlur } required={ required } />
            </div>
        );
    }

    renderControl() {
        if (this.state.type === 'select') {
            return this.renderSelect(this.props);
        }

        return this.renderInput(this.props);
    }
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    onClear: PropTypes.func,
    clearable: PropTypes.bool,
    custom: PropTypes.bool
};

export default Select;