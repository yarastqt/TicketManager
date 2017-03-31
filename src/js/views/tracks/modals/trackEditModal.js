import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { trackForm as validate } from 'validators/track';
import { getTrackById } from 'selectors/tracks';
import { Input, Textarea, Button, Form, FormActions } from 'components/ui';
import { updateTrack } from 'actions/tracks';

class TrackEditModal extends Component {
    constructor() {
        super();
        this.updateTrack = this.updateTrack.bind(this);
    }

    updateTrack(track) {
        return this.props.updateTrack(track).then(() => {
            this.props.hideModal();
        });
    }

    render() {
        const {
            handleSubmit,
            submitting,
            pristine,
            hideModal
        } = this.props;

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать сайт</div>
                <Form onSubmit={ handleSubmit(this.updateTrack) } submitting={ submitting }>
                    <Field
                        name="name"
                        type="text"
                        label="Название сайта"
                        component={ Input }
                    />
                    <Field
                        name="url"
                        type="text"
                        label="URL сайта"
                        component={ Input }
                    />
                    <Field
                        name="token"
                        type="text"
                        label="API Token"
                        component={ Input }
                        readonly
                    />
                    <Field
                        name="config"
                        label="PHP конфигурация"
                        component={ Textarea }
                        readonly
                        autoselect
                    />
                    <FormActions position="right">
                        <Button
                            type="button"
                            view="pseudo"
                            text="Отмена"
                            onClick={ hideModal }
                        />
                        <Button
                            type="submit"
                            view="action" icon="update"
                            text={ submitting ? 'Обновление...' : 'Обновить' }
                            disabled={ pristine || submitting }
                        />
                    </FormActions>
                </Form>
            </div>
        );
    }
}

TrackEditModal = reduxForm({
    form: 'trackEditForm',
    enableReinitialize: true,
    validate
})(TrackEditModal);

export default connect(
    (state, props) => ({
        initialValues: getTrackById(state, props)
    }),
    { updateTrack }
)(TrackEditModal);
