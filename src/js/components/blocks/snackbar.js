import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { toastExpires } from 'actions/toast';

class Snackbar extends Component {    
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
        return (
            <div className="snackbar">
                <div className={ this.props.toast.visible ? 'toast toast_visible' : 'toast' }>
                    <div className="toast__text">{ this.props.toast.text }</div>
                    <div className="toast__action" onClick={ this.hideToast }>Закрыть</div>
                </div>
            </div>
        );
    }
}

Snackbar.propTypes = {
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
)(Snackbar);