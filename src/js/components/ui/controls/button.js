import React, { PropTypes } from 'react';
import CN from 'classnames';

function Button({ onClick, type, icon, text, view, active, disabled }) {
    const buttonClasses = CN({
        'button': true,
        'button_disabled': disabled,
        'button_active': active,
        [`button_view_${view}`]: true
    });
    const iconClasses = CN({
        'icon': true,
        [`icon_${icon}`]: true
    });

    return (
        <button type={ type } className={ buttonClasses } style={{ minWidth: !text && '38px' }} onClick={ onClick } disabled={ disabled }>
            <span className="button__in">
                { icon && <i className={ iconClasses }></i> }
                { text && <span className="button__text">{ text }</span> }
            </span>
        </button>
    );
}

Button.defaultProps = {
    view: 'action'
};

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    view: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
};

export default Button;
