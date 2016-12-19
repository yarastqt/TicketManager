import { createSelector } from 'reselect';

import { graphics } from 'constants/chart';
import { filterData } from 'selectors/table';

export const getChartPoints = createSelector(
    (state) => state.tickets.list,
    (state, filters) => filters,
    (tickets, simpleFilters) => {
        if (!tickets.length || !simpleFilters.period) {
            return {};
        }

        const statuses = ['pending', 'failure', 'done', 'canceled'];
        const endDate = new Date().setHours(0, 0, 0, 0) + 86400000;
        const startDate = new Date(endDate - simpleFilters.period).setHours(0, 0, 0, 0);

        // It is necessary to extend our filters
        const filters = {
            ...simpleFilters, startDate, endDate
        };

        const filteredData = filterData(tickets, filters);

        // Step for comparison
        const section = filters.period / 7;

        // Default chart points
        const defaultPoints = [0, 0, 0, 0, 0, 0, 0];
        const pointsChart = {
            pending: [...defaultPoints], failure: [...defaultPoints], done: [...defaultPoints], canceled: [...defaultPoints]
        };

        // Create labels
        const labels = [];

        for (let i = 7; i >= 0; i--) {
            labels.push(+new Date(filters.endDate - section * i));
        }

        // Fill chart points
        filteredData.forEach((data) => {
            for (let i = 0; i < 7; i++) {
                let startEdge = filters.startDate + section * i;
                let endEdge = filters.startDate + section * (i + 1);

                if (data.date > startEdge && data.date <= endEdge && statuses.indexOf(data.status) !== -1) {
                    pointsChart[data.status][i]++;
                }
            }
        });

        // Create dataset
        const datasets = [];

        statuses.map((status) => {
            datasets.push({ ...graphics[status], data: pointsChart[status] });
        });

        return { labels, datasets };
    }
);