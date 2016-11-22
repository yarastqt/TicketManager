import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormData } from 'utils';
import { Input, Button } from 'components/ui';
import { TrackingActions } from 'actions';

const { addTrack } = TrackingActions;

class TrackNewModal extends Component {
    constructor() {
        super();
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack(event) {
        event.preventDefault();
        const data = getFormData(this.refs.form);

        if (data.name && data.url) {
            this.props.addTrack(data);
        }
    }

    render() {
        return (
            <div className="modal__in">
                <div className="modal__heading">Новый сайт</div>
                <form className="form" ref="form" onSubmit={ this.addTrack }>
                    <Input type="text" name="name" label="Название сайта" required />
                    <Input type="url" name="url" label="URL сайта" required />
                    <div className="form__actions">
                        <Button icon="quick-add" text="Добавить" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    { addTrack }
)(TrackNewModal);