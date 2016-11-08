import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import Portal from 'react-portal';

import dict from '../../constants/dict';
import { AuthActions, SidebarActions } from '../../actions';

const { logOut } = AuthActions;
const { toggleSidebar } = SidebarActions;

class Header extends Component {
    state = {
        popup: {
            visible: false,
            position: {
                top: null,
                left: null
            }
        }
    };

    constructor() {
        super();
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    openPopup() {
        const bodyRect = document.body.getBoundingClientRect();
        const targetRect = this.refs.headerUser.getBoundingClientRect();

        this.setState({
            popup: {
                visible: true,
                position: {
                    top: targetRect.top - bodyRect.top + 48,
                    left: targetRect.right
                }
            }
        });
    }

    closePopup() {
        this.setState({
            ...this.state,
            popup: { ...this.state.popup, visible: false }
        });
    }

    render() {
        const { user, toggleSidebar } = this.props;
        const { visible, position } = this.state.popup;
        const userClasses = classnames('header__user', {
            'header__user_active': visible
        });

        return (
            <div className="header">
                <div className="header__in">
                    <div className="header__menu-toggle" onClick={ toggleSidebar }>
                        <i className="icon icon_toggle"></i>
                    </div>
                    <div className="header__logo"></div>
                    <div className={ userClasses } ref="headerUser" onClick={ this.openPopup }>
                        <div className="header__user-meta">
                            <div className="header__user-name">Привет, { user.username }</div>
                            <div className="header__user-role">{ dict.roles[user.role] }</div>
                        </div>
                        <div className="header__user-avatar">
                            <img className="image" src={ user.avatar } />
                        </div>
                        <Portal closeOnEsc closeOnOutsideClick isOpened={ visible } onClose={ this.closePopup }>
                            <div className="popup" style={{ left: position.left, top: position.top }}>
                                <Link to="/profile" className="popup__button" onClick={ this.closePopup }>
                                    <i className="icon icon_person"></i>
                                    <span className="popup__button-text">Профиль</span>
                                </Link>
                                <div className="popup__separator"></div>
                                <div className="popup__button" onClick={ this.props.logOut }>
                                    <i className="icon icon_exit"></i>
                                    <span className="popup__button-text">Выйти</span>
                                </div>
                            </div>
                        </Portal>
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