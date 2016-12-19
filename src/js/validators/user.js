import { isEmpty, isEmptyObject } from 'utils';

export function userForm(data) {
    const errors = {};

    if (isEmptyObject(data)) {
        return errors;
    }

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