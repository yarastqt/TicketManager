import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import { i18n } from '../../utils';
import { logOut } from '../../actions/auth';
import { toggleSidebar } from '../../actions/sidebar';

class Header extends Component {
    state = {
        userActive: false
    };

    handleToggleMenu() {
        this.props.dispatch(toggleSidebar());
    }

    handleTogglePopup() {
        this.setState({
            userActive: !this.state.userActive
        });
    }

    handleLogOut(event) {
        event.preventDefault();
        this.props.dispatch(logOut());
    }

    render() {
        const { user } = this.props;
        const userClassName = classnames('header__user', {
            'header__user_active': this.state.userActive
        });

        return (
            <div className="header">
                <div className="header__in">
                    <div className="header__menu-toggle" onClick={ this.handleToggleMenu.bind(this) }>
                        <i className="icon icon_toggle"></i>
                    </div>
                    <div className="header__logo"></div>
                    <div className={ userClassName } onClick={ this.handleTogglePopup.bind(this) }>
                        <div className="header__user-meta">
                            <div className="header__user-name">Привет, { user.username }</div>
                            <div className="header__user-role">{ i18n('roles', user.role) }</div>
                        </div>
                        <div className="header__user-avatar">
                            <img className="image" src={ user.avatar } />
                        </div>
                        <div className="header__popup">
                            <Link to="#" className="header__popup-link">
                                <i className="icon icon_person"></i>
                                <span>Профиль</span>
                            </Link>
                            <div className="header__popup-separator"></div>
                            <Link to="#" className="header__popup-link" onClick={ this.handleLogOut.bind(this) }>
                                <i className="icon icon_exit"></i>
                                <span>Выйти</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;