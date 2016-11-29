import { getObjectInArray } from 'utils';

export function getTrackById(tracks, trackId) {
    return getObjectInArray(tracks, 'id', trackId);
}