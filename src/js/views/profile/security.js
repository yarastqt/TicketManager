import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { profileSecurityForm as validate } from 'validators/profile';
import { Input, Button, FormActions } from 'components/ui';
import { updateProfile } from 'actions/profile';

class ProfileSecurityView extends Component {
    constructor() {
        super();
        this.updateProfile = this.updateProfile.bind(this);
    }

    updateProfile(profile) {
        return this.props.updateProfile(profile).then(() => {
            this.props.reset();
        });
    }

    render() {
        return (
            <div className="paper__in">
                <form className="form" autoComplete="off" onSubmit={ this.props.handleSubmit(this.updateProfile) }>
                    <Field name="oldPassword" type="password" label="Старый пароль"
                        component={ Input }
                    />
                    <Field name="newPassword" type="password" label="Новый пароль"
                        component={ Input }
                    />
                    <Field name="confirmPassword" type="password" label="Новый пароль ещё раз"
                        component={ Input }
                    />
                    <FormActions position="right">
                        <Button type="submit" view="action" icon="update"
                            text={ this.props.submitting ? 'Обработка...' : 'Изменить пароль' }
                            disabled={ this.props.pristine || this.props.submitting }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

ProfileSecurityView = reduxForm({
    form: 'profile/security',
    validate
})(ProfileSecurityView);

export default connect(
    null,
    { updateProfile }
)(ProfileSecurityView);
