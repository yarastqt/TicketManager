import { isEmpty } from 'utils';
import { emailReg } from 'constants/validators';

export function loginForm(data) {
    const errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Обязательно';
    } else if (!emailReg.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Обязательно';
    }

    return errors;
}

export function registerForm(data) {
    const errors = {};

    if (isEmpty(data.username)) {
        errors.username = 'Обязательно';
    }

    if (isEmpty(data.email)) {
        errors.email = 'Обязательно';
    } else if (!emailReg.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Обязательно';
    }

    return errors;
}