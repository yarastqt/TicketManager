import { isEmpty, isEmptyObject } from 'utils';
import { urlReg } from 'constants/validators';

export function trackForm(data) {
    const errors = {};

    if (isEmpty(data.name)) {
        errors.name = 'Укажите название сайта';
    }

    if (isEmpty(data.url)) {
        errors.url = 'Укажите URL сайта';
    } else if (!urlReg.test(data.url)) {
        errors.url = 'Некорректный url'
    }

    return errors;
}