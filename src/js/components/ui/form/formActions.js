import React from 'react';

const FormActions = ({ children, position }) => (
    <div className={ `form__actions form__actions_${position}` }>
        { children }
    </div>
);

export default FormActions;
