import React, { Component } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

class Elevator extends Component {
    constructor() {
        super();
        this.state = { visible: false };
        this.onScroll = this.onScroll.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        this.content = document.querySelector('.content');
        this.content.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        this.content.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        const contentOffsetTop = this.content.scrollTop;
        const contentHeight = this.content.clientHeight + contentOffsetTop;
        const contentScroll = this.content.scrollHeight;

        this.setState({ visible: contentOffsetTop > 200 && contentHeight < contentScroll - 92 });
    }

    scrollToTop() {
        let scrollCount = null;
        let prevTS = performance.now();

        const cosParameter = this.content.scrollTop / 2;
        const scroll = (nextTS) => {
            scrollCount += Math.PI / (this.props.scrollDuration / (nextTS - prevTS));

            if (scrollCount >= Math.PI) {
                this.content.scrollTop = 0;
            }

            if (this.content.scrollTop !== 0) {
                this.content.scrollTop = Math.round(cosParameter + cosParameter * Math.cos(scrollCount));

                prevTS = nextTS;
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    }

    render() {
        const elevatorClasses = CN('elevator', {
            'elevator_visible': this.state.visible,
            'elevator_shifted': this.props.isActiveSnackBar
        });

        return (
            <div className={ elevatorClasses } onClick={ this.scrollToTop }></div>
        );
    }
}

export default connect(
    (state) => ({
        isActiveSnackBar: state.toast.visible
    })
)(Elevator);
