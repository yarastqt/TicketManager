import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/modal';

import TicketAddModal from 'views/tickets/modals/ticketAddModal';
import TicketEditModal from 'views/tickets/modals/ticketEditModal';
import TrackAddModal from 'views/tracks/modals/trackAddModal';
import TrackEditModal from 'views/tracks/modals/trackEditModal';
import UserEditModal from 'views/users/modals/userEditModal';

const modals = {
    TicketAddModal, TicketEditModal, TrackAddModal, TrackEditModal, UserEditModal
};

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

    renderContent() {
        const { modal: { view, props }, hideModal } = this.props;
        const modalProps = { ...props, hideModal };


        if (view) {
            const ModalContent = modals[view];

            return (
                <ModalContent
                    { ...modalProps }
                />
            );
        }
    }

    render() {
        return (
            <div className={ this.props.modal.visible ? 'modal modal_visible' : 'modal' }>
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