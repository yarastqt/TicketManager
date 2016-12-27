import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import menu from 'constants/menu';
import { hideSidebar } from 'actions/sidebar';

function Sidebar({ hideSidebar, expanded, user }) {
    return (
        <div className={ expanded ? 'sidebar sidebar_expanded': 'sidebar' }>
            <div className="sidebar__menu">
                { menu.map(({ url, name, icon, roles }) => (
                    roles && roles.indexOf(user.role) === -1 ? null : (
                        <div className="sidebar__menu-item" key={ name }>
                            <Link to={ url } className="sidebar__menu-link" activeClassName="sidebar__menu-link_active" title={ name }>
                                <i className={ `icon icon_${ icon }` }></i>
                                <span className="sidebar__menu-text">{ name }</span>
                            </Link>
                        </div>
                    )
                )) }
            </div>
            <div className="sidebar__overlay" onClick={ hideSidebar }></div>
        </div>
    );
}

Sidebar.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            roles: PropTypes.array
        })
    ),
    user: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    hideSidebar: PropTypes.func.isRequired
};

export default connect(
    null,
    { hideSidebar }
)(Sidebar);