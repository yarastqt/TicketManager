import React, { Component } from 'react';
import classnames from 'classnames';

class ProgressBar extends Component {
    state = {
        active: false
    };

    render() {
        const progressClasses = classnames('progress', {
            'progress_active': this.state.active
            // 'progress_active': true
        });

        return (
            <div className={ progressClasses } ref="progress">
                <div className="progress__line"></div>
            </div>
        );
    }
}

ProgressBar.defaultProps = {
    tickDelay: 250
};

export default ProgressBar;