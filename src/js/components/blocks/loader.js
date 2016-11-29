import React, { PropTypes } from 'react';

function Loader({ fetching, children }) {
    if (fetching) {
        return (
            <div className="loader">
                <svg className="loader__spinner" viewBox="25 25 50 50">
                    <circle className="loader__spinner-path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
            </div>
        );
    }

    return React.Children.only(children);
}

Loader.propTypes = {
    fetching: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
};

export default Loader;