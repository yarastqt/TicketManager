import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import ProgressBar from '../components/blocks/progressBar';
import Header from '../components/blocks/header';
import Sidebar from '../components/blocks/sidebar';
import Modal from '../components/blocks/modal';
import Elevator from '../components/blocks/elevator';
import Notification from '../components/blocks/notification';

function Dashboard({ sidebar, user, dispatch, children }) {
    const contentClasses = classnames('content', {
        'content_expanded': sidebar
    });

    return (
        <div className="main">
            <ProgressBar />
            <Header user={ user } dispatch={ dispatch } />
            <Sidebar sidebar={ sidebar } />
            <div className={ contentClasses }>
                { children }
                <div className="footer">
                    <div className="footer__developer">Разработано и спроектировано в JetMix &copy; 2016</div>
                </div>
            </div>
            <Modal />
            <Elevator />
            <Notification />
        </div>
    );
}

export default connect((state) => ({
    sidebar: state.sidebar,
    user: state.session.user
}))(Dashboard);