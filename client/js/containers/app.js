import React, { Children, PropTypes } from 'react';

function App({ children }) {
    return Children.only(children);
}

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;