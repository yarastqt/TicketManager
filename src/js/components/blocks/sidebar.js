import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {
    renderMenuList() {
        return this.props.menu.map(({ url, name, icon, roles }) => {
            if (roles && roles.indexOf(this.props.user.role) === -1) {
                return null;
            }

            return (
                <div className="sidebar-menu__item" key={ name }>
                    <Link to={ url } className="sidebar-menu__link" activeClassName="sidebar-menu__link_active" title={ name }>
                        <i className={ `icon icon_${ icon }` }></i>
                        <span className="sidebar-menu__text">{ name }</span>
                    </Link>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={ this.props.expanded ? 'sidebar sidebar_expanded': 'sidebar' }>
                <div className="sidebar-menu">
                    { this.renderMenuList() }
                </div>
            </div>
        );
    }
}

Sidebar.defaultProps = {
    menu: [
        {
            url: '/tasks',
            name: 'Заявки',
            icon: 'box'
        },
        {
            url: '/users',
            name: 'Пользователи',
            icon: 'people',
            roles: ['admin']
        },
        {
            url: '/statistics',
            name: 'Статистика',
            icon: 'chart'
        },
        {
            url: '/tracks',
            name: 'Отслеживание',
            icon: 'code',
            roles: ['admin']
        }
    ]
};

Sidebar.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired
        })
    ),
    user: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired
};

export default Sidebar;