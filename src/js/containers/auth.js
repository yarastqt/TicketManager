import React from 'react';
import { Link } from 'react-router'

import Notification from 'components/blocks/notification';

function Auth({ children, location }) {
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
            <Notification />
        </div>
    );
}

export default Auth;