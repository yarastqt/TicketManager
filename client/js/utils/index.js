import isEqual from 'lodash/isEqual';

import http from './http';
import createReducer from './reducer';
import datez from './date';

export {
    http,
    createReducer,
    datez
};

export function getRange(total, page, rows) {
    const start = rows * (page - 1) + 1;
    const end = Math.min(page * rows, total);

    return {
        start,
        end
    };
}

export function getFormData(form, onlyFilled) {
    const targers = form.querySelectorAll('input, textarea, select');

    return [].reduce.call(targers, (result, formElement) => {
        if (formElement.hasAttribute('name')) {
            const value = formElement.value.trim();

            if (onlyFilled) {
                if (value.length) {
                    result[formElement.name] = value;
                }
            } else {
                result[formElement.name] = value;
            }
        }

        return result;
    }, {});
}

export function getScrollWidth() {
    const innerWidth = window.innerWidth;
    const clientWidth = document.body.clientWidth;

    return innerWidth - clientWidth;
}

export function compareTaskObject(prev, next) {
    const prevObject = Object.assign({}, prev);
    const nextObject = Object.assign({}, next);

    delete prevObject.createdAt;
    delete prevObject.createdBy;
    delete prevObject.id;

    return isEqual(prevObject, nextObject);
}

export function compareUserObject(prev, next) {
    const prevObject = Object.assign({}, prev);
    const nextObject = Object.assign({}, next);

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