import React, { PropTypes } from 'react';

function Form({ submitting, onSubmit, children }) {
    return (
        <form className={ submitting ? 'form form_disabled' : 'form' } onSubmit={ onSubmit } autoComplete="off">
            { children }
        </form>
    );
}

Form.propTypes = {
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};

export default Form;