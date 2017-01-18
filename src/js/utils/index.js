export http from './http';
export createReducer from './reducer';
export DateUtil from './date';

export function isEmpty(value) {
    return !value || value.trim() === '';
}

export function isEmptyObject(object) {
    return !Object.keys(object).length;
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

export function normalizeErrors(errors) {
    return errors.reduce((container, { field, message }) => {
        container[field] = message;
        return container;
    }, {});
}

export function getRange(total, page, rows) {
    const start = rows * (page - 1) + 1;
    const end = Math.min(page * rows, total);

    return {
        start,
        end
    };
}
