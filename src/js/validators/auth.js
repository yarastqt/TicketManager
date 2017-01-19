import { isEmpty } from 'utils';
import { emailRegExp } from 'constants/validators';

export function loginForm(data) {
    const errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Введите email';
    } else if (!emailRegExp.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Введите пароль';
    }

    return errors;
}

export function registerForm(data) {
    const errors = {};

    if (isEmpty(data.username)) {
        errors.username = 'Введите имя';
    }

    if (isEmpty(data.email)) {
        errors.email = 'Введите email';
    } else if (!emailRegExp.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Введите пароль';
    }

    return errors;
}
