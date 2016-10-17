import React, { Component } from 'react';
import classnames from 'classnames';

class ProgressBar extends Component {
    state = {
        active: false
    };

    componentWillReceiveProps(nextProps) {
        // if (this.props.location.pathname !== nextProps.location.pathname) {
        //     this.setState({ active: false });

        //     setTimeout(() => this.setState({ active: true }));

        //     this.refs.progress.addEventListener('animationend', () => {
        //         this.setState({
        //             active: false
        //         });
        //     });
        // }
    }

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

export default ProgressBar;