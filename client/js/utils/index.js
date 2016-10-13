import http from './http';
import createReducer from './createReducer';

export {
    http,
    createReducer
};

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