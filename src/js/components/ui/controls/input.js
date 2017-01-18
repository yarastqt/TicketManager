import React, { Component } from 'react';

class Input extends Component {
    constructor() {
        super();
        this.state = { value: null, type: null };
        this.changeInputType = this.changeInputType.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount() {
        this.setState({ value: this.props.input.value, type: this.props.type });
        this.props.autofocus && this.refs.input.focus();
    }

    changeValue(event) {
        this.setState({ value: event.target.value });
        this.props._onChange && this.props._onChange({
            name: event.target.name,
            value: event.target.value
        });
        this.props.input.onChange(event.target.value);
    }

    changeInputType() {
        this.setState((state) => {
            if (state.type === 'password') {
                return { type: 'text' };
            }

            return { type: 'password' };
        });

        setTimeout(() => this.refs.input.focus(), 0);
    }

    renderSecurityControl() {
        const type = this.state.type === 'password' ? 'close' : 'open';

        if (this.props.type === 'password') {
            return (
                <span className="input__security" onClick={ this.changeInputType }>
                    <i className={ `icon icon_eye-${type}` }></i>
                </span>
            );
        }
    }

    renderError() {
        if (this.props.meta.touched && this.props.meta.error) {
            return (
                <div className="input__error">
                    { this.props.meta.error }
                </div>
            );
        }
    }

    render() {
        const { type } = this.state;
        const { input, label, placeholder, readonly, meta: { active } } = this.props;

        return (
            <div className="form__field">
                <label htmlFor={ input.name } className={ active ? 'label label_active' : 'label' }>
                    { label }
                </label>
                <div className="input">
                    { this.renderSecurityControl() }
                    <input id={ input.name } type={ type } placeholder={ placeholder } className="input__control" ref="input"
                        readOnly={ readonly } { ...input } onChange={ this.changeValue }
                    />
                    { this.renderError() }
                </div>
            </div>
        );
    }
}

export default Input;