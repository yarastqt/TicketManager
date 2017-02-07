import React, { PropTypes } from 'react';
import { Link } from 'react-router'

function Authentication({ location, children }) {
    return (
        <div className="sign-container">
            <div className="sign-container__logo"></div>
            { children }
            <div className="sign-container__links">
                { location.pathname === '/auth/register' ? (
                    <Link to="/auth/login" className="sign-container__link">Авторизация</Link>
                ) : (
                    <Link to="/auth/register" className="sign-container__link">Регистрация</Link>
                ) }
            </div>
        </div>
    );
}

Authentication.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
};

export default Authentication;
