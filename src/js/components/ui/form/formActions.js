import React from 'react';

function FormActions({ children, position }) {
    return (
        <div className={ `form__actions form__actions_${position}` }>
            { children }
        </div>
    );
}

export default FormActions;