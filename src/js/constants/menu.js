export default [
    {
        url: '/tickets',
        name: 'Заявки',
        icon: 'box'
    },
    {
        url: '/statistics',
        name: 'Статистика',
        icon: 'chart'
    },
    {
        url: '/users',
        name: 'Пользователи',
        icon: 'people',
        roles: ['admin']
    },
    {
        url: '/tracks',
        name: 'Отслеживание',
        icon: 'code',
        roles: ['admin']
    }
];
