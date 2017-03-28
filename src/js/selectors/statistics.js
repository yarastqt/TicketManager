import { createSelector } from 'reselect';

import { filterData } from 'selectors/table';
import { DateUtil } from 'utils';

export const getStatistics = createSelector(
    (state) => state.tickets.list,
    (state) => state.filters.statistics.list,
    (tickets, filters) => {
        if (!filters.startDate && !filters.endDate) {
            return [];
        }

        const initialData = { new: 0, pending: 0, failure: 0, done: 0, canceled: 0 };
        const filteredData = filterData(tickets, filters);
        const result = filteredData.reduce((acc, { date, status }) => {
            const currentDate = DateUtil.fromTS(date).getDate();
            const data = acc[currentDate] || initialData;
            acc[currentDate] = { date: currentDate, ...data, [status]: data[status] + 1 };

            return acc;
        }, {});
        const normalizedResult = Object.keys(result).map((key) => result[key]);

        return normalizedResult;
    }
);
