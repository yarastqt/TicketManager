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

export const getFormData = (form) => {
    return [].reduce.call(
        form.querySelectorAll('input, textarea, select'),
        (result, formElement) => {
            if (formElement.hasAttribute('name')) {
                result[formElement.name] = formElement.value.trim();
            }

            return result;
        }, {}
    );
}

export function i18n(section, key) {
    const dictionary = {
        roles: {
            'newbie': 'Новичок',
            'manager': 'Менеджер',
            'senior manager': 'Старшый менеджер',
            'admin': 'Администратор'
        },
        statuses: {
            pending: 'В процессе',
            failure: 'Отказ',
            done: 'Выполнено',
            canceled: 'Отменено'
        }
    };

    return dictionary[section][key];
}