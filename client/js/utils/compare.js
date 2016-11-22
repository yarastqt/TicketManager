import isEqual from 'lodash/isEqual';

export function compareObject(prev, next) {
    return isEqual(prev, next);
}

export function compareTaskObject(prev, next) {
    const prevObject = { ...prev };
    const nextObject = { ...next };

    delete prevObject.createdAt;
    delete prevObject.createdBy;
    delete prevObject.id;

    return isEqual(prevObject, nextObject);
}

export function compareUserObject(prev, next) {
    const prevObject = { ...prev };
    const nextObject = { ...next };

    delete prevObject.avatar;
    delete prevObject.id;

    if (nextObject.blocked === 'true') {
        nextObject.blocked = true;
    }

    if (nextObject.blocked === 'false') {
        nextObject.blocked = false;
    }

    return isEqual(prevObject, nextObject);
}

export function compareTrackObject(prev, next) {
    const prevObject = { ...prev };
    const nextObject = { ...next };

    delete prevObject.id;
    delete nextObject.config;

    return isEqual(prevObject, nextObject);
}