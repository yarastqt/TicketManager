import React, { PropTypes } from 'react';

function Button({ onClick, icon, text, view }) {
    return (
        <button className={ `button button_view_${view}` } style={{ minWidth: !text && '24px' }} onClick={ onClick }>
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
    icon: PropTypes.string,
    text: PropTypes.string,
    view: PropTypes.string
};

export default Button;