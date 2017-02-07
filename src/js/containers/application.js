import React, { Children, PropTypes } from 'react';

function Application({ children }) {
    return Children.only(children);
}

Application.propTypes = {
    children: PropTypes.element.isRequired
};

export default Application;
