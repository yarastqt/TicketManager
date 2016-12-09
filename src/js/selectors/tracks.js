import { createSelector } from 'reselect';
import { getObjectInArray } from 'utils';

export const getTrackById = createSelector(
    (state) => state.tracks.list,
    (state, props) => props.trackId,
    (tracks, id) => getObjectInArray(tracks, 'id', id)
);