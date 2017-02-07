import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import { toastExpires } from 'actions/toast';

class SnackBar extends Component {
    constructor() {
        super();
        this.hideToast = this.hideToast.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast.visible !== this.props.toast.visible) {
            this.toastTimeout && clearTimeout(this.toastTimeout);
            this.toastTimeout = setTimeout(() => {
                this.props.toastExpires();
            }, this.props.toast.expires);
        }
    }

    hideToast() {
        this.toastTimeout && clearTimeout(this.toastTimeout);
        this.props.toastExpires();
    }

    render () {
        const { toast: { visible, text } } = this.props;
        const toastClasses = CN({
            'toast': true,
            'toast_visible': visible
        });

        return (
            <div className="snackbar">
                <div className={ toastClasses }>
                    <div className="toast__text">{ text }</div>
                    <div className="toast__action" onClick={ this.hideToast }>Закрыть</div>
                </div>
            </div>
        );
    }
}

SnackBar.propTypes = {
    toast: PropTypes.shape({
        visible: PropTypes.bool,
        text: PropTypes.string,
        expires: PropTypes.number
    })
};

export default connect(
    (state) => ({
        toast: state.toast
    }),
    { toastExpires }
)(SnackBar);
