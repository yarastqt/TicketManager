export function getFilters(list) {
    const filters = {
        sources: [], statuses: [], managers: [], serviceTypes: []
    };

    if (list.length) {
        list.map(({ source, status, createdBy, serviceType }) => {
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
                container.push({ value, label: value });
                return container;
            }, []);
        }
    }

    return filters;
}