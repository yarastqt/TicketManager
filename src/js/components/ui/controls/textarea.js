import React, { Component } from 'react';

class Textarea extends Component {
    constructor() {
        super();
        this.selectValue = this.selectValue.bind(this);
    }

    selectValue() {
        this.refs.input.select();
    }

    render() {
        const { input, name, label, placeholder, readonly, autoselect, meta: { active } } = this.props;

        return (
            <div className="form__field">
                <label htmlFor={ name } className={ active ? 'label label_active' : 'label' }>
                    { label }
                </label>
                <textarea id={ name } placeholder={ placeholder } className="textarea" ref="input"
                    readOnly={ readonly } { ...input } onClick={ autoselect && this.selectValue }
                />
            </div>
        );
    }
}

export default Textarea;