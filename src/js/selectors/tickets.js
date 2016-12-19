import { createSelector } from 'reselect';
import { getObjectInArray } from 'utils';

export const getTicketById = createSelector(
    (state) => state.tickets.list,
    (state, props) => props.ticketId,
    (tickets, id) => getObjectInArray(tickets, 'id', id)
);