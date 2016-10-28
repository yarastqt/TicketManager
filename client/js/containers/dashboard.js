import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
    Header,
    Sidebar,
    Modal,
    Elevator,
    Notification
} from '../components/blocks';

function Dashboard({ sidebar, dispatch, children }) {
    const contentClasses = classnames('content', {
        'content_expanded': sidebar
    });

    return (
        <div className="main">
            <Header />
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
    sidebar: state.sidebar
}))(Dashboard);