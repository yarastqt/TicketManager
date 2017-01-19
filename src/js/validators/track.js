import { isEmpty, isEmptyObject } from 'utils';
import { urlRegExp } from 'constants/validators';

export function trackForm(data) {
    const errors = {};

    if (isEmpty(data.name)) {
        errors.name = 'Укажите название сайта';
    }

    if (isEmpty(data.url)) {
        errors.url = 'Укажите URL сайта';
    } else if (!urlRegExp.test(data.url)) {
        errors.url = 'Некорректный url'
    }

    return errors;
}
