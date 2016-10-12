import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getAllTasks } from '../actions/tasks';

class TasksContainer extends Component {
    componentWillMount() {
        this.props.dispatch(getAllTasks());
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

TasksContainer.propTypes = {
    children: PropTypes.element
};

export default connect((state) => ({}))(TasksContainer);