import { isEmpty } from 'utils';
import { emailReg } from 'constants/validators';

export function profileCommonForm(data) {
    const errors = {};

    if (isEmpty(data.username)) {
        errors.username = 'Укажите имя';
    }

    if (isEmpty(data.email)) {
        errors.email = 'Укажите email';
    } else if (!emailReg.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    return errors;
}

export function profileSecurityForm(data) {
    const errors = {};

    if (isEmpty(data.oldPassword)) {
        errors.oldPassword = 'Укажите старый пароль';
    }

    if (isEmpty(data.newPassword)) {
        errors.newPassword = 'Укажите новый пароль';
    }

    if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Укажите новый пароль ещё раз';
    } else if (!isEmpty(data.newPassword) && data.newPassword !== data.confirmPassword) {
        errors.confirmPassword = 'Новый пароль не совпадает';
    }

    return errors;
}