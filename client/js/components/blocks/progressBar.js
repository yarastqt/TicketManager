import React, { Component } from 'react';
import classnames from 'classnames';

class ProgressBar extends Component {
    state = {
        progress: null,
        active: false
    };

    tick() {
        let amount = null;
        let { progress } = this.state;

        if (progress >= 0 && progress < 0.25) {
            amount = (Math.random() * 3 + 3) / 100;
        } else if (progress >= 0.25 && progress < 0.65) {
            amount = (Math.random() * 3) / 100;
        } else if (progress >= 0.65 && progress < 0.9) {
            amount = (Math.random() * 2) / 100;
        } else if (progress >= 0.9 && progress < 0.99) {
            amount = 0.005;
        } else {
            amount = 0;
        }
    }

    render() {
        const progressClasses = classnames('progress', {
            'progress_active': this.state.active
        });

        return (
            <div className={ progressClasses }>
                <div className="progress__line"></div>
            </div>
        );
    }
}

ProgressBar.defaultProps = {
    tickDelay: 250
};

export default ProgressBar;