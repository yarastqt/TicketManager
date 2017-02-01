import React, { Component } from 'react';
import CN from 'classnames';

class Textarea extends Component {
    constructor() {
        super();
        this.selectValue = this.selectValue.bind(this);
    }

    selectValue() {
        this.refs.input.select();
    }

    render() {
        const { input, label, placeholder, readonly, autoselect, meta: { active } } = this.props;
        const labelClasses = CN({
            'label': true,
            'label_active': active
        });

        return (
            <div className="form__field">
                <label htmlFor={ input.name } className={ labelClasses }>
                    { label }
                </label>
                <textarea
                    ref="input"
                    id={ input.name }
                    placeholder={ placeholder }
                    className="textarea"
                    readOnly={ readonly }
                    { ...input }
                    onClick={ autoselect && this.selectValue }
                />
            </div>
        );
    }
}

export default Textarea;
