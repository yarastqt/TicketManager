import React from 'react';
import { Link } from 'react-router';

import { Content } from 'components/blocks';

const ProfileView = ({ children }) => (
    <Content title="Профиль">
        <div className="content__header">
            <div className="content__heading">Профиль</div>
        </div>
        <div className="content__navigation">
            <Link
                to="/profile"
                className="content__navigation-link"
                activeClassName="content__navigation-link_active"
                onlyActiveOnIndex
            >Основное</Link>
            <Link
                to="/profile/security"
                className="content__navigation-link"
                activeClassName="content__navigation-link_active"
            >Безопасность</Link>
            <Link
                className="content__navigation-link content__navigation-link_disabled"
                activeClassName="content__navigation-link_active"
            >Разработка</Link>
        </div>
        <div className="paper">
            { children }
        </div>
    </Content>
);

export default ProfileView;
