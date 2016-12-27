import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content, Loader } from 'components/blocks';
import { Table, TableColumn, Button } from 'components/ui';
import { getTracks, deleteTrack } from 'actions/tracks';
import { showModal } from 'actions/modal';

class TracksView extends Component {
    constructor() {
        super();
        this.showTrackNewModal = this.showTrackNewModal.bind(this);
        this.showTrackModal = this.showTrackModal.bind(this);
        this.deleteTrack = this.deleteTrack.bind(this);
    }

    componentDidMount() {
        this.props.getTracks();
    }

    showTrackNewModal() {
        this.props.showModal('TrackAddModal');
    }

    showTrackModal(trackId) {
        this.props.showModal('TrackEditModal', { trackId });
    }

    deleteTrack(trackId) {
        if (confirm('Вы действительно хотите удалить сайт?')) {
            this.props.deleteTrack(trackId);
        }
    }

    render() {
        return (
            <Content title="Отслеживание">
                <div className="content__header">
                    <div className="content__heading">Отслеживание</div>
                    <div className="content__actions">
                        <Button type="button" view="action" icon="quick-add" text="Добавить сайт"
                            onClick={ this.showTrackNewModal }
                        />
                    </div>
                </div>
                <Loader fetching={ this.props.tracks.fetching }>
                    <Table
                        name="tracks" data={ this.props.tracks.list } page={ this.props.page }
                        edit={ this.showTrackModal } remove={ this.deleteTrack }
                    >
                        <TableColumn
                            name="id" width="10" title="ID"
                        />
                        <TableColumn
                            name="name" width="45" title="Название сайта"
                        />
                        <TableColumn
                            name="url" width="45" title="URL сайта"
                        />
                    </Table>
                </Loader>
            </Content>
        );
    }
}

export default connect(
    (state, route) => ({
        tracks: state.tracks,
        page: parseInt(route.params.page) || 1
    }),
    { getTracks, deleteTrack, showModal }
)(TracksView);