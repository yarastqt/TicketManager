export function loginForm(data) {
    const errors = {};

    if (!data.email) {
        errors.email = 'Обязательно';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (!data.password) {
        errors.password = 'Обязательно';
    }

    return errors;
}

export function registerForm(data) {
    const errors = {};

    if (!data.username) {
        errors.username = 'Обязательно';
    }

    if (!data.email) {
        errors.email = 'Обязательно';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Некорректный email';
    }

    if (!data.password) {
        errors.password = 'Обязательно';
    }

    return errors;
}