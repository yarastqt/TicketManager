import React, { PropTypes } from 'react';

const Form = ({ submitting, onSubmit, children }) => (
    <form className={ submitting ? 'form form_disabled' : 'form' } onSubmit={ onSubmit } autoComplete="off">
        { children }
    </form>
);

Form.propTypes = {
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};

export default Form;
