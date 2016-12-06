import http from './http';
import createReducer from './reducer';
import DateUtil from './date';

export {
    http,
    createReducer,
    DateUtil
};

export function isEmpty(value) {
    return !value || value.trim() === '';
}

export function findInArray(source, key, value) {
    return source.filter((item) => item[key] === value);
}

export function getObjectInArray(source, key, value) {
    return findInArray(source, key, value)[0] || {};
}

export function updateObjectInArray(source, key, replace) {
    return source.map((item) =>
        item[key] === replace[key] ? { ...item, ...replace } : item
    );
}

export function deleteObjectFromArray(source, key, value) {
    return source.filter((item) => item[key] !== value);
}

export function getRange(total, page, rows) {
    const start = rows * (page - 1) + 1;
    const end = Math.min(page * rows, total);

    return {
        start,
        end
    };
}

export function getScrollWidth() {
    const innerWidth = window.innerWidth;
    const clientWidth = document.body.clientWidth;

    return innerWidth - clientWidth;
}