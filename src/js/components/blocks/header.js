import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CN from 'classnames';

import { SnowFlakes } from 'components/blocks';
import dict from 'constants/dict';
import { logout } from 'actions/session';
import { toggleSidebar } from 'actions/sidebar';

class Header extends Component {
    constructor() {
        super();
        this.state = { popupOpened: false };
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.closePopupOnEsc = this.closePopupOnEsc.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('keyup', this.closePopupOnEsc);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
        document.removeEventListener('keyup', this.closePopupOnEsc);
    }

    handleClickOutside(event) {
        if (!this.refs.headerUser.contains(event.target)) {
            this.closePopup();
        }
    }

    closePopupOnEsc(event) {
        if (this.state.popupOpened && event.keyCode === 27) {
            this.closePopup();
        }
    }

    openPopup() {
        this.setState({ popupOpened: !this.state.popupOpened });
    }

    closePopup() {
        this.setState({ popupOpened: false });
    }

    render() {
        const { expandedSidebar, user, toggleSidebar, logout } = this.props;
        const { popupOpened, position } = this.state;
        const headerUserClasses = CN({
            'header__user': true,
            'header__user_active': popupOpened,
            'header__user_online': navigator.onLine,
            'header__user_offline': !navigator.onLine
        });
        const headerPopupClasses = CN({
            'popup popup_tail header__popup': true,
            'header__popup_opened': popupOpened
        });
        const headerMenuIconClasses = CN({
            'header__menu-icon': true,
            'header__menu-icon_opened': !expandedSidebar
        });

        return (
            <div className="header">
                <div className="header__in">
                    <div className="header__menu-toggle" onClick={ toggleSidebar }>
                        <span className={ headerMenuIconClasses }></span>
                    </div>
                    <div className="header__logo"></div>
                    <div className={ headerUserClasses } ref="headerUser" onClick={ this.openPopup }>
                        <div className="header__user-meta">
                            <div className="header__user-name">Привет, { user.username }</div>
                            <div className="header__user-role">{ dict.roles[user.role] }</div>
                        </div>
                        <div className="header__user-avatar">
                            <img className="image" src={ user.avatar } />
                        </div>
                        <div className={ headerPopupClasses }>
                            <Link to="/profile" className="popup__button">
                                <i className="icon icon_person"></i>
                                <span className="popup__button-text">Профиль</span>
                            </Link>
                            <div className="popup__separator"></div>
                            <div className="popup__button" onClick={ logout }>
                                <i className="icon icon_exit"></i>
                                <span className="popup__button-text">Выйти</span>
                            </div>
                        </div>
                    </div>
                    <SnowFlakes />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        user: state.session.user
    }),
    { logout, toggleSidebar }
)(Header);
