import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { trackForm as validate } from 'validators/track';
import { Input, Button, Form, FormActions } from 'components/ui';
import { addTrack } from 'actions/tracks';

class TrackAddModal extends Component {
    constructor() {
        super();
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack(data) {
        return this.props.addTrack(data).then(() => {
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
                <div className="modal__heading">Новый сайт</div>
                <Form onSubmit={ handleSubmit(this.addTrack) } submitting={ submitting }>
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
                    <FormActions position="right">
                        <Button
                            type="button"
                            view="pseudo"
                            text="Отмена"
                            onClick={ hideModal }
                        />
                        <Button
                            type="submit"
                            view="action"
                            icon="quick-add"
                            text={ submitting ? 'Добавление...' : 'Добавить' }
                            disabled={ pristine || submitting }
                        />
                    </FormActions>
                </Form>
            </div>
        );
    }
}

TrackAddModal = reduxForm({
    form: 'trackAddForm',
    validate
})(TrackAddModal);

export default connect(
    null,
    { addTrack }
)(TrackAddModal);
