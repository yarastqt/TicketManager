import React, { Component } from 'react';
import CN from 'classnames';

class Select extends Component {
    constructor() {
        super();
        this.state = { value: '', type: 'select', id: Math.floor(performance.now()) };
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

    setFocus() {
        setTimeout(() => this.refs.input.focus(), 0);
    }

    changeOption(event) {
        if (event.target.value === 'custom') {
            this.setState({ value: this.props.input.value || '', type: 'input' });
            this.setFocus();
        } else {
            this.setState({ value: event.target.value });

            if (this.props._onChange) {
                this.props._onChange({ name: event.target.name, value: event.target.value });
            }

            this.props.input.onChange(event.target.value);
        }
    }

    clearSelect() {
        this.setState({ value: '' });

        if (this.props._onChange) {
            this.props._onChange({ name: this.refs.input.name, value: '' });
        }

        this.props.input.onChange('');
        this.setFocus();
    }

    returnSelectControl() {
        this.setState({ value: '', type: 'select' });
        this.setFocus();
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
        const { id } = this.state;
        const { input, placeholder, options, custom, clearable, highlight, meta: { active } } = this.props;
        const selectClasses = CN('select', {
            'select_focused': active,
            'select_clearable': clearable 
        });
        const selectControlClasses = CN('select__control', {
            'select__control_active': highlight && input.value
        });

        return (
            <div className={ selectClasses }>
                { this.renderClearControl() }
                <select id={ input.name + id } className={ selectControlClasses } ref="input" { ...input } onChange={ this.changeOption }>
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
        const { id } = this.state;
        const { input, placeholder } = this.props;

        return (
            <div className="input">
                <span className="input__cancel" onClick={ this.returnSelectControl }>
                    <i className="icon icon_close"></i>
                </span>
                <input id={ input.name + id } type="text" placeholder={ placeholder } className="input__control" ref="input" { ...input } />
                { this.renderError('input') }
            </div>
        );
    }

    render() {
        const { type, id } = this.state;
        const { input, label, meta: { active } } = this.props;
        const labelClasses = CN({
            'label': true,
            'label_active': active
        });

        return (
            <div className="form__field">
                <label htmlFor={ input.name + id } className={ labelClasses }>
                    { label }
                </label>
                { type === 'select' ? this.renderSelect() : this.renderInput() }
            </div>
        );
    }
}

export default Select;
