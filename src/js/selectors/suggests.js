import { createSelector } from 'reselect';

export const getSuggests = createSelector(
    (state) => state.tickets.list,
    (tickets) => {
        const suggests = tickets.reduce((acc, value) => {
            if (value.name && !acc.name.includes(value.name)) {
                acc.name.push(value.name);
            }

            switch (value.taskType) {
                case 'Заявка':
                    if (value.taskSource && !acc.taskSource.ticket.includes(value.taskSource)) {
                        acc.taskSource.ticket.push(value.taskSource);
                    }
                    break;

                case 'Звонок':
                    if (value.taskSource && !acc.taskSource.call.includes(value.taskSource)) {
                        acc.taskSource.call.push(value.taskSource);
                    }
                    break;

                case 'Почта':
                    if (value.taskSource && !acc.taskSource.mail.includes(value.taskSource)) {
                        acc.taskSource.mail.push(value.taskSource);
                    }
                    break;
            }


            return acc;
        }, { name: [], taskSource: { ticket: [], call: [], mail: [] } });

        return suggests;
    }
);
