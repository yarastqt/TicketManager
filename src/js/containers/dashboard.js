import React from 'react';
import { connect } from 'react-redux';

import { Header, Sidebar, Modal, Elevator, SnackBar } from 'components/blocks';

function Dashboard({ user, expandedSidebar, children }) {
    return (
        <div className="main">
            <Header />
            <Sidebar user={ user } expanded={ expandedSidebar } />
            <div className={ expandedSidebar ? 'content content_expanded' : 'content' }>
                { children }
                <div className="footer">
                    <div className="footer__developer">Разработано и спроектировано в JetMix &copy; { new Date().getFullYear() }</div>
                </div>
            </div>
            <Modal />
            <Elevator scrollDuration={ 400 } />
            <SnackBar />
        </div>
    );
}

export default connect((state) => ({
    user: state.session.user,
    expandedSidebar: state.sidebar.expanded
}))(Dashboard);
