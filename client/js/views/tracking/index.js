import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TrackingActions, ModalActions } from 'actions';
import { Content, Loader } from 'components/blocks';
import { Table, TableColumn, Button } from 'components/ui';

const { getTracks, deleteTrack } = TrackingActions;
const { showModal } = ModalActions;

class TrackingView extends Component {
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
        this.props.showModal('trackNew');
    }

    showTrackModal(trackId) {
        this.props.showModal('track', { trackId });
    }

    deleteTrack(trackId) {
        if (confirm('Вы действительно хотите удалить сайт?')) {
            this.props.deleteTrack(trackId);
        }
    }

    render() {
        const { tracks: { list, fetching }, page } = this.props;

        return (
            <Content title="Отслеживание">
                <div className="content__header">
                    <div className="content__heading">Отслеживание</div>
                    <div className="content__actions">
                        <Button icon="quick-add" text="Добавить сайт" onClick={ this.showTrackNewModal } />
                    </div>
                </div>
                <Loader fetching={ fetching }>
                    <Table
                        edit={ this.showTrackModal }
                        remove={ this.deleteTrack }
                        name="tracks"
                        data={ list }
                        page={ page }
                    >
                        <TableColumn
                            name="id"
                            width="10"
                            title="ID"
                        />
                        <TableColumn
                            name="name"
                            width="45"
                            title="Название сайта"
                        />
                        <TableColumn
                            name="url"
                            width="45"
                            title="URL сайта"
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
)(TrackingView);