import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import { Header, Sidebar, Modal, Elevator, SnackBar } from 'components/blocks';

const Dashboard = ({ user, expandedSidebar, children }) => {
    const contentClasses = CN('content', {
        content_expanded: expandedSidebar
    });

    return (
        <div className="main">
            <Header expandedSidebar={ expandedSidebar } />
            <Sidebar user={ user } expandedSidebar={ expandedSidebar } />
            <div className={ contentClasses }>
                { children }
                <div className="footer">
                    <div className="footer__developer">
                        Разработано и спроектировано в JetMix &copy; { new Date().getFullYear() }
                    </div>
                </div>
            </div>
            <Modal />
            <Elevator scrollDuration={ 400 } />
            <SnackBar />
        </div>
    );
};

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    expandedSidebar: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
};

export default connect((state) => ({
    user: state.session.user,
    expandedSidebar: state.sidebar.expanded
}))(Dashboard);
