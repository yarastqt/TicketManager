import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import menu from 'constants/menu';

function Sidebar({ expanded, user }) {
    return (
        <div className={ expanded ? 'sidebar sidebar_expanded': 'sidebar' }>
            <div className="sidebar-menu">
                { menu.map(({ url, name, icon, roles }) => (
                    roles && roles.indexOf(user.role) === -1 ? null : (
                        <div className="sidebar-menu__item" key={ name }>
                            <Link to={ url } className="sidebar-menu__link" activeClassName="sidebar-menu__link_active" title={ name }>
                                <i className={ `icon icon_${ icon }` }></i>
                                <span className="sidebar-menu__text">{ name }</span>
                            </Link>
                        </div>
                    )
                )) }
            </div>
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
    expanded: PropTypes.bool.isRequired
};

export default Sidebar;