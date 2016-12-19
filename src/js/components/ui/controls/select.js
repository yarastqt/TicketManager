import React, { Component } from 'react';
import classnames from 'classnames';

class Select extends Component {
    constructor() {
        super();
        this.state = { value: '', type: 'select' };
        this.changeOption = this.changeOption.bind(this);
        this.clearSelect = this.clearSelect.bind(this);
        this.returnSelectControl = this.returnSelectControl.bind(this);
    }

    componentDidMount() {
        const { value } = this.props.input;

        if (!!value) {
            if (this.props.options.length && !this.props.options.some((option) => option.value == value)) {
                this.setState({ value, type: 'input' });
            } else {
                this.setState({ value });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.input.value) {
            this.setState({ value: '' });
        }
    }

    changeOption(event) {
        if (event.target.value === 'custom') {
            this.setState({ value: this.props.input.value || '', type: 'input' });
            setTimeout(() => this.refs.input.focus(), 0);
        } else {
            this.setState({ value: event.target.value });
            this.props.onChange && this.props.onChange({
                name: event.target.name,
                value: event.target.value
            });
            this.props.input.onChange(event.target.value);
        }
    }

    clearSelect() {
        this.setState({ value: '' });
        this.props.onChange && this.props.onChange({
            name: this.refs.input.name,
            value: ''
        });
        this.props.input.onChange('');
        setTimeout(() => this.refs.input.focus(), 0);
    }

    returnSelectControl() {
        this.setState({ value: '', type: 'select' });
        setTimeout(() => this.refs.input.focus(), 0);
    }

    renderError(controlName) {
        if (this.props.meta.touched && this.props.meta.error) {
            return (
                <div className={ `${controlName}__error` }>
                    { this.props.meta.error }
                </div>
            );
        }
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

    renderSelect() {
        const { input, name, placeholder, options, custom, clearable, meta: { active } } = this.props;
        const selectClasses = classnames('select', {
            'select_focused': active, 'select_clearable': clearable
        });

        return (
            <div className={ selectClasses }>
                { this.renderClearControl() }
                <select id={ name } className="select__control" ref="input" { ...input } onChange={ this.changeOption }>
                    <option value="" disabled></option>
                    { options && options.map(({ value, label }, key) => (
                        <option value={ value } key={ key }>{ label }</option>
                    )) }
                    { custom && <option value="custom">Другое</option> }
                </select>
                { this.renderError('select') }
            </div>
        );
    }

    renderInput() {
        const { input, name, placeholder } = this.props;

        return (
            <div className="input">
                <span className="input__cancel" onClick={ this.returnSelectControl }>
                    <i className="icon icon_close"></i>
                </span>
                <input id={ name } type="text" placeholder={ placeholder } className="input__control" ref="input" { ...input } />
                { this.renderError('input') }
            </div>
        );
    }

    render() {
        const { type } = this.state;
        const { name, label, meta: { active } } = this.props;

        return (
            <div className="form__field">
                <label htmlFor={ name } className={ active ? 'label label_active' : 'label' }>
                    { label }
                </label>
                { type === 'select' ? this.renderSelect() : this.renderInput() }
            </div>
        );
    }
}

export default Select;