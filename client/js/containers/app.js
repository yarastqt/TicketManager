import React, { PropTypes } from 'react';

function App({ children }) {
    return React.Children.only(children);
}

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;