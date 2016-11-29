import React from 'react';
import { connect } from 'react-redux';

import {
    Header,
    Sidebar,
    Modal,
    Elevator,
    Notification
} from 'components/blocks';

function Dashboard({ user, sidebar, dispatch, children }) {
    return (
        <div className="main">
            <Header />
            <Sidebar user={ user } sidebar={ sidebar } />
            <div className={ sidebar ? 'content content_expanded' : 'content' }>
                { children }
                <div className="footer">
                    <div className="footer__developer">Разработано и спроектировано в JetMix &copy; { new Date().getFullYear() }</div>
                </div>
            </div>
            <Modal />
            <Elevator />
            <Notification />
        </div>
    );
}

export default connect((state) => ({
    user: state.session.user,
    sidebar: state.sidebar
}))(Dashboard);