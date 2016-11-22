import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import UserModal from '../modals/userModal';
import TaskModal from '../modals/taskModal';
import TaskNewModal from '../modals/taskNewModal';


import TrackModal from 'views/tracking/trackModal';
import TrackNewModal from 'views/tracking/trackNewModal';

import { getScrollWidth } from 'utils';
import { ModalActions } from 'actions';

const { hideModal } = ModalActions;

class Modal extends Component {
    constructor() {
        super();
        this.hideModalOnEsc = this.hideModalOnEsc.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', this.hideModalOnEsc);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.hideModalOnEsc);
    }

    hideModalOnEsc(event) {
        if (this.props.modal.visible && event.keyCode === 27) {
            this.props.hideModal();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modal.visible) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = getScrollWidth();
        } else {
            document.body.style.overflow = null;
            document.body.style.paddingRight = null;
        }
    }

    renderContent() {
        const { modal: { view, props }, hideModal } = this.props;
        const modalProps = { ...props, hideModal };

        switch (this.props.modal.view) {
            case 'user':
                return <UserModal { ...modalProps } />;

            case 'task':
                return <TaskModal { ...modalProps } />;

            case 'taskNew':
                return <TaskNewModal { ...modalProps } />;

            case 'track':
                return <TrackModal { ...modalProps } />;

            case 'trackNew':
                return <TrackNewModal { ...modalProps } />;

            default:
                return null;
        }
    }

    render() {
        const modalClasses = classnames('modal', {
            'modal_visible': this.props.modal.visible
        });

        return (
            <div className={ modalClasses }>
                <div className="modal__container">
                    { this.renderContent() }
                </div>
                <div className="modal__overlay" onClick={ this.props.hideModal }></div>
            </div>
        );
    }
}

Modal.propTypes = {
    modal: PropTypes.shape({
        visible: PropTypes.bool.isRequired,
        view: PropTypes.string,
        props: PropTypes.object
    })
};

export default connect(
    (state) => ({
        modal: state.modal
    }),
    { hideModal }
)(Modal);