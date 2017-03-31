import { Children, PropTypes } from 'react';

const Application = ({ children }) => (
    Children.only(children)
);

Application.propTypes = {
    children: PropTypes.element.isRequired
};

export default Application;
