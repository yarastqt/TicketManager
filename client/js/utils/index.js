import http from './http';
import createReducer from './reducer';

export {
    http,
    createReducer
};

export function getRange(total, page, rows) {
    const start = rows * (page - 1) + 1;
    const end = Math.min(page * rows, total);

    return {
        start,
        end
    };
}

export function getFormData(form) {
    const targers = form.querySelectorAll('input, textarea, select');

    return [].reduce.call(targers, (result, formElement) => {
        if (formElement.hasAttribute('name')) {
            result[formElement.name] = formElement.value.trim();
        }

        return result;
    }, {});
}