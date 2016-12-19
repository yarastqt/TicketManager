import { createSelector } from 'reselect';

import dict from 'constants/dict';

export const getFilters = createSelector(
    (state) => state.tickets.list,
    (tickets) => {
        const filters = {
            sources: [], statuses: [], managers: [], serviceTypes: [], period: []
        };

        if (tickets.length) {
            tickets.forEach(({ source, status, createdBy, serviceType }) => {
                if (filters.sources.indexOf(source) === -1) {
                    filters.sources.push(source);
                }

                if (filters.statuses.indexOf(status) === -1) {
                    filters.statuses.push(status);
                }

                if (filters.managers.indexOf(createdBy.username) === -1) {
                    filters.managers.push(createdBy.username);
                }

                if (filters.serviceTypes.indexOf(serviceType) === -1) {
                    filters.serviceTypes.push(serviceType);
                }
            });

            for (const key in filters) {
                filters[key] = filters[key].reduce((container, value) => {
                    if (key === 'statuses') {
                        container.push({ value, label: dict.statuses[value] });
                    } else {
                        container.push({ value, label: value });
                    }

                    return container;
                }, []);
            }
        }

        filters.period = [
            { value: 691200000, label: 'Неделя' },
            { value: 2592000000, label: 'Месяц' },
            { value: 15552000000, label: 'Пол года' },
            { value: 31104000000, label: 'Год' }
        ];

        return filters;
    }
);