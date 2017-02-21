import { createSelector } from 'reselect';

import dict from 'constants/dict';

export const getFilters = createSelector(
    (state) => state.tickets.list,
    (tickets) => {
        const initialFilters = {
            sources: [], statuses: [], managers: [], serviceTypes: [], period: [
                { value: 691200000, label: 'Неделя' },
                { value: 2592000000, label: 'Месяц' },
                { value: 15552000000, label: 'Пол года' },
                { value: 31104000000, label: 'Год' }
            ]
        };

        if (tickets.length) {
            const flatFilters = tickets.reduce((acc, { source, status, createdBy: { username: manager }, serviceType }) => {
                if (source && !acc['sources'].includes(source)) {
                    acc['sources'].push(source);
                }
                if (status && !acc['statuses'].includes(status)) {
                    acc['statuses'].push(status);
                }
                if (manager && !acc['managers'].includes(manager)) {
                    acc['managers'].push(manager);
                }
                if (serviceType && !acc['serviceTypes'].includes(serviceType)) {
                    acc['serviceTypes'].push(serviceType);
                }

                return acc;
            }, initialFilters);

            const filters = Object.keys(flatFilters).reduce((acc, key) => {
                acc[key] = acc[key].map((value) => {
                    if (typeof value !== 'object') {
                        return (key === 'statuses')
                            ? { value, label: dict.statuses[value] }
                            : { value, label: value };
                    }

                    return value;
                });

                return acc;
            }, flatFilters);

            return filters;
        }

        return initialFilters;
    }
);
