import { createSelector } from 'reselect';

import { filterData } from 'selectors/table';
import { DateUtil } from 'utils';

export const getStatistics = createSelector(
    (state) => state.tickets.list,
    (state) => state.filters.statistics.list,
    (tickets, filters) => {
        if (!filters.startDate && !filters.endDate) {
            return {
                list: [],
                total: {}
            };
        }

        const initialData = { new: 0, pending: 0, failure: 0, done: 0, canceled: 0 };
        const filteredData = filterData(tickets, filters);
        const result = filteredData.reduce((acc, { date, status }) => {
            const currentDate = DateUtil.fromTS(date).getDate();
            const data = acc[currentDate] || initialData;
            acc[currentDate] = {
                ...data,
                date: currentDate,
                [status]: data[status] + 1
            };

            return acc;
        }, {});
        const normalizedResult = Object.keys(result).map((key) => result[key]);
        const totalStatistics = normalizedResult.reduce((acc, value) => {
            Object.keys(initialData).forEach((key) => acc[key] += value[key]);

            return acc;
        }, initialData);

        return {
            list: normalizedResult,
            total: {
                ...totalStatistics,
                count: filteredData.length
            }
        };
    }
);
