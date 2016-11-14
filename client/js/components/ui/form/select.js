import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import Control from './control';

class Select extends Control {
    state = {
        value: '',
        type: 'select'
    };

    constructor() {
        super();
        this.changeOption = this.changeOption.bind(this);
        this.cancelInput = this.cancelInput.bind(this);
        this.clearSelect = this.clearSelect.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.value !== 'undefined' && this.props.value !== '') {
            if (this.props.options.length && !this.props.options.some(({ value }) => value === this.props.value)) {
                this.setState({ value: this.props.value, type: 'input' });
            } else {
                this.setState({ value: this.props.value });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value === 'undefined') {
            this.setState({ value: '' });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    changeOption(event) {
        if (event.target.value === 'other') {
            this.setState({ value: this.props.value || '', type: 'input' });
            setTimeout(() => {
                this.refs.control.focus();
            }, 0);
        } else {
            this.setState({ value: event.target.value });
        }
    }

    cancelInput() {
        this.setState({ value: '', type: 'select' });
        setTimeout(() => {
            this.refs.control.focus();
        }, 0);
    }

    clearSelect() {
        this.setState({ value: '' });
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

    renderPlaceholder() {
        if (this.props.placeholder || !this.state.value) {
            return (
                <option value="" disabled>
                    { this.props.placeholder || '' }
                </option>
            );
        }
    }

    renderSelect() {
        const { name, options, disabled, required, custom } = this.props;
        const value = typeof this.state.value !== 'undefined' ? this.state.value : '';
        const controlClasses = classnames('select__control', {
            'select__control_clearable': this.props.clearable && this.state.value
        });

        return (
            <div className={ this.props.disabled ? 'select select_disabled' : 'select' }>
                { this.renderClearControl() }
                <select ref="control" name={ name } id={ name } value={ value } className={ controlClasses } onChange={ this.changeOption } onFocus={ this.handleFocus } onBlur={ this.handleBlur } disabled={ disabled } required={ required }>
                    { this.renderPlaceholder() }
                    { options.map(({ value, label }, key) =>
                        <option value={ value } key={ key }>{ label }</option>
                    ) }
                    { custom && <option value="other">Другое</option> }
                </select>
            </div>
        );
    }

    renderInput() {
        const { name, options, disabled, required } = this.props;

        return (
            <div className={ this.getClassName('input') }>
                <span className="input__cancel" onClick={ this.cancelInput }>
                    <i className="icon icon_close"></i>
                </span>
                <input ref="control" type="text" name={ name } id={ name } defaultValue={ this.state.value || '' } className="input__control" autoComplete="off" onFocus={ this.handleFocus } onBlur={ this.handleBlur } disabled={ disabled } required={ required } />
            </div>
        );
    }

    renderControl() {
        if (this.state.type === 'select') {
            return this.renderSelect();
        }

        return this.renderInput();
    }
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.bool.isRequired
    ]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.bool.isRequired
            ]),
            label: PropTypes.string.isRequired
        })
    ),
    onClear: PropTypes.func,
    clearable: PropTypes.bool,
    custom: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool
};

export default Select;