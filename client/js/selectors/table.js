import orderBy from 'lodash/orderBy';
import { getRange } from '../utils';

export function filterData(data, filters) {
    if (!Object.keys(filters).length) {
        return data;
    }

    const l = Object.keys(filters).length;
    const result = data.filter((item) => {
        let matches = 0;

        for (let key in filters) {
            if (key === 'startDate' || key === 'endDate') {
                const endDate = filters.endDate ? filters.endDate : filters.startDate;

                if (item.date >= filters.startDate && item.date <= endDate + 86400000) {
                    matches++;
                    continue;
                }
            }

            if (key === 'createdBy' && item.createdBy.username === filters[key]) {
                matches++;
                continue;
            }

            if (item[key] === filters[key]) {
                matches++;
            }
        }

        if (matches === l) {
            return item;
        }
    });

    return result;
}

export function sortData(data, { key, desc }) {
    return orderBy(data, key, desc ? 'desc' : 'asc');
}

export function paginate(data, page, rows) {
    const { start, end } = getRange(data.length, page, rows);
    return data.slice(start - 1, end);
}