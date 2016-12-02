import { isEmpty } from 'utils';

export function userForm(data) {
    const errors = {};

    if (typeof data.blocked === 'string') {
        try {
            JSON.parse(data.blocked)
        } catch (e) {
            errors.blocked = 'Укажите состояние';
        }
    }

    if (isEmpty(data.role)) {
        errors.role = 'Укажите должность';
    }

    return errors;
}