import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { hideModal } from 'actions/modal';

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
            const { default: ModalContent } = require(`views/${view}`);

            return (
                <ModalContent
                    { ...modalProps }
                />
            );
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