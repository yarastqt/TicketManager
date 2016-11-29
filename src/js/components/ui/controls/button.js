import React, { PropTypes } from 'react';
import classnames from 'classnames';

function Button({ onClick, type, icon, text, view, disabled }) {
    const buttonClasses = classnames(`button button_view_${view}`, {
        'button_disabled': disabled
    });

    return (
        <button type={ type } className={ buttonClasses } style={{ minWidth: !text && '24px' }} onClick={ onClick } disabled={ disabled }>
            <span className="button__in">
                { icon && <i className={ `icon icon_${icon}` }></i> }
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
    disabled: PropTypes.bool
};

export default Button;