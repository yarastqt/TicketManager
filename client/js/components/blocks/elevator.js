import React, { Component } from 'react';
import classnames from 'classnames';

class Elevator extends Component {
    state = {
        visible: false
    };

    constructor() {
        super();
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        const offsetTop = window.pageYOffset;
        const winHeight = window.innerHeight + offsetTop;
        const docHeight = document.body.offsetHeight;

        if (offsetTop > 600 && winHeight < docHeight - 100) {
            this.setState({ visible: true });
        } else {
            this.setState({ visible: false });
        }
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }

    render() {
        const elevatorClasses = classnames('elevator', {
            'elevator_visible': this.state.visible
        });

        return <div className={ elevatorClasses } onClick={ this.scrollToTop } />;
    }
}

export default Elevator;