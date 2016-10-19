import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import dict from '../../constants/dict';
import { AuthActions, SidebarActions } from '../../actions';

const { logOut } = AuthActions;
const { toggleSidebar } = SidebarActions;

class Header extends Component {
    state = {
        userActive: false
    };

    handleTogglePopup() {
        this.setState({
            userActive: !this.state.userActive
        });
    }

    handleLogOut(event) {
        event.preventDefault();
        this.props.logOut();
    }

    render() {
        const { user, toggleSidebar } = this.props;
        const userClasses = classnames('header__user', {
            'header__user_active': this.state.userActive
        });

        return (
            <div className="header">
                <div className="header__in">
                    <div className="header__menu-toggle" onClick={ toggleSidebar }>
                        <i className="icon icon_toggle"></i>
                    </div>
                    <div className="header__logo"></div>
                    <div className={ userClasses } onClick={ this.handleTogglePopup.bind(this) }>
                        <div className="header__user-meta">
                            <div className="header__user-name">Привет, { user.username }</div>
                            <div className="header__user-role">{ dict.roles[user.role] }</div>
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

export default connect(
    (state) => ({
        user: state.session.user
    }),
    { logOut, toggleSidebar }
)(Header);