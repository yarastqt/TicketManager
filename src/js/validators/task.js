export function taskForm(data) {
    const errors = {};

    if (!data.name) {
        errors.name = 'Укажите ФИО или компанию';
    }

    if (!data.date) {
        errors.date = 'Укажите дату';
    }

    if (!data.time) {
        errors.time = 'Укажите время';
    }

    if (!data.status) {
        errors.status = 'Укажите статус';
    }

    if (!data.source) {
        errors.source = 'Укажите источник';
    }

    if (!data.taskType) {
        errors.taskType = 'Укажите тип заявки';
    }

    if (!data.taskSource) {
        errors.taskSource = 'Укажите источник заявки';
    }

    if (!data.serviceType) {
        errors.serviceType = 'Укажите вид услуги';
    }

    return errors;
}