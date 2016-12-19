import { isEmpty, isEmptyObject } from 'utils';

export function ticketForm(data) {
    const errors = {};

    if (isEmptyObject(data)) {
        return errors;
    }

    if (isEmpty(data.name)) {
        errors.name = 'Укажите ФИО или компанию';
    }

    if (isEmpty(data.date)) {
        errors.date = 'Укажите дату';
    }

    if (isEmpty(data.time)) {
        errors.time = 'Укажите время';
    }

    if (isEmpty(data.status)) {
        errors.status = 'Укажите статус';
    }

    if (isEmpty(data.taskType)) {
        errors.taskType = 'Укажите тип заявки';
    }

    if (isEmpty(data.taskSource)) {
        errors.taskSource = 'Укажите источник заявки';
    }

    if (isEmpty(data.serviceType)) {
        errors.serviceType = 'Укажите вид услуги';
    }

    return errors;
}