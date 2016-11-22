import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormData, createTrackConfig, compareTrackObject } from 'utils';
import { getTrackById } from 'selectors/tracks';
import { Input, Textarea, Button } from 'components/ui';
import { TrackingActions } from 'actions';

const { updateTrack } = TrackingActions;

class TrackModal extends Component {
    constructor() {
        super();
        this.updateTrack = this.updateTrack.bind(this);
    }

    updateTrack(id) {
        return (event) => {
            event.preventDefault();
            const data = getFormData(this.refs.form);

            if (compareTrackObject(this.props.track, data)) {
                this.props.hideModal();
            } else if (data.name && data.url) {
                this.props.updateTrack(id, data);
            }
        };
    }

    render() {
        const { track: { id, name, url, token } } = this.props;

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать сайт</div>
                <form className="form" ref="form" onSubmit={ this.updateTrack(id) }>
                    <Input type="text" name="name" label="Название сайта" value={ name } required />
                    <Input type="url" name="url" label="URL сайта" value={ url } required />
                    <Input type="text" name="token" label="Token" value={ token } readonly />
                    <Textarea name="config" label="PHP конфигурация" value={ createTrackConfig(token) } readonly autoselect />
                    <div className="form__actions">
                        <Button icon="update" text="Обновить" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({
        track: getTrackById(state.tracks.list, props.trackId)
    }),
    { updateTrack }
)(TrackModal);