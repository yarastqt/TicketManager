import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import UserModal from '../modals/userModal';
import TaskModal from '../modals/taskModal';
import TaskNewModal from '../modals/taskNewModal';

import { ModalActions } from '../../actions';

const { hideModal } = ModalActions;

class Modal extends Component {
    constructor() {
        super();
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modal.visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }

    hideModal(event) {
        event.preventDefault();
        this.props.hideModal();
    }

    renderContent() {
        const { view, props } = this.props.modal;
        const modalProps = Object.assign({}, props, { hideModal: this.hideModal });

        switch (this.props.modal.view) {
            case 'user':
                return <UserModal { ...modalProps } />;

            case 'task':
                return <TaskModal { ...modalProps } />;

            case 'taskNew':
                return <TaskNewModal { ...modalProps } />

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
                <div className="modal__overlay" onClick={ this.hideModal } />
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