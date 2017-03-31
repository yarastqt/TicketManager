export const ticketSelectOptions = {
    options: {
        sources: [
            { value: 'Яндекс РСЯ', label: 'Яндекс РСЯ' },
            { value: 'Яндекс Реклама', label: 'Яндекс Реклама' },
            { value: 'Яндекс Поиск', label: 'Яндекс Поиск' },
            { value: 'Google КМС', label: 'Google КМС' },
            { value: 'Google Реклама', label: 'Google Реклама' },
            { value: 'Google Поиск', label: 'Google Поиск' },
            { value: 'Неизвестно', label: 'Неизвестно' }
        ],
        taskTypes: [
            { value: 'Заявка', label: 'Заявка' },
            { value: 'Звонок', label: 'Звонок' },
            { value: 'Почта', label: 'Почта' }
        ],
        serviceTypes: [
            { value: 'Переезд квартиры', label: 'Переезд квартиры' },
            { value: 'Переезд офиса', label: 'Переезд офиса' },
            { value: 'Переезд за город', label: 'Переезд за город' },
            { value: 'Перевозка мебели', label: 'Перевозка мебели' },
            { value: 'Междугородний переезд', label: 'Междугородний переезд' },
            { value: 'Грузоперевозки', label: 'Грузоперевозки' }
        ],
        statuses: [
            { value: 'new', label: 'Новая' },
            { value: 'pending', label: 'В процессе' },
            { value: 'failure', label: 'Отказ' },
            { value: 'done', label: 'Выполнено' },
            { value: 'canceled', label: 'Отменено' }
        ]
    }
};

export const userSelectOptions = {
    options: {
        statuses: [
            { value: false, label: 'Активен' },
            { value: true, label: 'Заблокирован' }
        ],
        roles: [
            { value: 'manager', label: 'Менеджер' },
            { value: 'senior manager', label: 'Старшый менеджер' },
            { value: 'admin', label: 'Администратор' }
        ]
    }
};
