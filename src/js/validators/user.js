export function userForm(data) {
    const errors = {};

    if (!data.blocked || typeof JSON.parse(data.blocked) !== 'boolean') {
        errors.blocked = 'Укажите состояние';
    }

    if (!data.role) {
        errors.role = 'Укажите должность';
    }

    return errors;
}