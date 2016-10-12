import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

class Notification extends Component {
    renderNotificationList() {
        return this.props.notifications.map(({ id, message }) => {
            return (
                <div className="notification__item" key={ id }>
                    <div className="notification__text">{ message }</div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="notification">
                <ReactCSSTransitionGroup transitionName="show-notification" transitionEnterTimeout={ 2000 } transitionLeaveTimeout={ 2000 }>
                    { this.renderNotificationList() }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Notification.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired
        })
    )
};

export default connect((state) => ({
    notifications: state.notifications
}))(Notification);