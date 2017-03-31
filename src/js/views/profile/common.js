import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import dict from 'constants/dict';
import { profileCommonForm as validate } from 'validators/profile';
import { Input, Button, FormActions } from 'components/ui';
import { updateProfile } from 'actions/profile';

class ProfileCommonView extends Component {
    constructor() {
        super();
        this.updateProfile = this.updateProfile.bind(this);
    }

    updateProfile(profile) {
        return this.props.updateProfile(profile);
    }

    render() {
        return (
            <div className="paper__in">
                <form className="form" autoComplete="off" onSubmit={ this.props.handleSubmit(this.updateProfile) }>
                    <Field
                        name="id"
                        type="text"
                        label="ID"
                        component={ Input } readonly
                    />
                    <Field
                        name="role"
                        type="text"
                        label="Группа"
                        component={ Input } readonly
                    />
                    <Field
                        name="username"
                        type="text"
                        label="Имя"
                        component={ Input }
                    />
                    <Field
                        name="email"
                        type="text"
                        label="E-Mail"
                        component={ Input }
                    />
                    <FormActions position="right">
                        <Button type="submit" view="action" icon="update"
                            text={ this.props.submitting ? 'Обработка...' : 'Обновить данные' }
                            disabled={ this.props.pristine || this.props.submitting }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

ProfileCommonView = reduxForm({
    form: 'profile/common',
    enableReinitialize: true,
    validate
})(ProfileCommonView);

function mapStateToProps(state) {
    const user = state.session.user;

    return {
        initialValues: { ...user, role: dict.roles[user.role] }
    };
}

export default connect(
    mapStateToProps,
    { updateProfile }
)(ProfileCommonView);
