import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { trackForm as validate } from 'validators/track';
import { getTrackById } from 'selectors/tracks';
import { Input, Textarea, Button, FormActions } from 'components/ui';
import { updateTrack } from 'actions/tracks';

class TrackModal extends Component {
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
        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать сайт</div>
                <form className="form" autoComplete="off" onSubmit={ this.props.handleSubmit(this.updateTrack) }>
                    <Field name="name" type="text" label="Название сайта"
                        component={ Input }
                    />
                    <Field name="url" type="text" label="URL сайта"
                        component={ Input }
                    />
                    <Field name="token" type="text" label="Token"
                        component={ Input } readonly
                    />
                    <Field name="config" label="PHP конфигурация"
                        component={ Textarea } readonly autoselect
                    />
                    <FormActions position="right">
                        <Button type="button" view="pseudo" text="Отмена"
                            onClick={ this.props.hideModal }
                        />
                        <Button type="submit" view="action" icon="update"
                            text={ this.props.submitting ? 'Обновление...' : 'Обновить' }
                            disabled={ this.props.pristine || this.props.submitting }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

TrackModal = reduxForm({
    form: 'updateTrack',
    enableReinitialize: true,
    validate
})(TrackModal);

export default connect(
    (state, props) => ({
        // initialValues: getTrackById(state.tracks.list, props.trackId)
        initialValues: getTrackById(state, props)
    }),
    { updateTrack }
)(TrackModal);