export function trackForm(data) {
    const errors = {};

    if (!data.name) {
        errors.name = 'Укажите название сайта';
    }

    if (!data.url) {
        errors.url = 'Укажите URL сайта';
    } else if (!/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i.test(data.url)) {
        errors.url = 'Некорректный url'
    }

    return errors;
}