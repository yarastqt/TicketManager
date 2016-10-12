import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getAllUsers } from '../actions/users';

class UsersContainer extends Component {
    componentWillMount() {
        this.props.dispatch(getAllUsers());
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

UsersContainer.propTypes = {
    children: PropTypes.element.isRequired
};

export default connect((state) => ({}))(UsersContainer);