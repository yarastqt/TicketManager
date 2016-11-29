export function profileForm(data) {
    const errors = {};

    if (!data.username) {
        errors.username = 'Укажите имя';
    }

    if (!data.email) {
        errors.email = 'Укажите email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    return errors;
}