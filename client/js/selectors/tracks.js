export function getTrackById(tracks, trackId) {
    return tracks.filter(
        (track) => track.id === parseInt(trackId)
    ).pop() || {};
}