import { http } from 'utils';
import { hideModal } from './modal';
import { pushToast } from './toast';

export const TICKETS_LOAD_REQUEST = 'TICKETS_LOAD_REQUEST';
export const TICKETS_LOAD_SUCCESS = 'TICKETS_LOAD_SUCCESS';
export const TICKETS_LOAD_FAILURE = 'TICKETS_LOAD_FAILURE';

export function getTickets() {
    return (dispatch, getState) => {
        const { tickets } = getState();

        if (!tickets.list.length) {
            dispatch({ type: TICKETS_LOAD_REQUEST });

            return http.get('/v1/tickets').then((payload) => {
                dispatch({ type: TICKETS_LOAD_SUCCESS, payload });
            }).catch((error) => {
                // console.log(error);
            });
        }
    };
}

export const TICKET_ADD_REQUEST = 'TICKET_ADD_REQUEST';
export const TICKET_ADD_SUCCESS = 'TICKET_ADD_SUCCESS';
export const TICKET_ADD_FAILURE = 'TICKET_ADD_FAILURE';

export function addTicket(data) {
    return (dispatch) => {
        dispatch({ type: TICKET_ADD_REQUEST });

        return http.post('/v1/tickets', data).then((payload) => {
            dispatch({ type: TICKET_ADD_SUCCESS, payload });
            dispatch(pushToast('Заявка добавлена'));
        });
    };
}

export const TICKET_UPDATE_REQUEST = 'TICKET_UPDATE_REQUEST';
export const TICKET_UPDATE_SUCCESS = 'TICKET_UPDATE_SUCCESS';
export const TICKET_UPDATE_FAILURE = 'TICKET_UPDATE_FAILURE';

export function updateTicket(ticket) {
    return (dispatch) => {
        dispatch({ type: TICKET_UPDATE_REQUEST });

        return http.put(`/v1/tickets/${ticket.id}`, ticket).then((payload) => {
            dispatch({ type: TICKET_UPDATE_SUCCESS, payload });
            dispatch(pushToast('Заявка обновлена'));
        });
    };
}

export const TICKET_REMOVE_REQUEST = 'TICKET_REMOVE_REQUEST';
export const TICKET_REMOVE_SUCCESS = 'TICKET_REMOVE_SUCCESS';
export const TICKET_REMOVE_FAILURE = 'TICKET_REMOVE_FAILURE';

export function removeTicket(ticketId) {
    return (dispatch) => {
        dispatch({ type: TICKET_REMOVE_REQUEST });

        return http.delete(`/v1/tickets/${ticketId}`).then((payload) => {
            dispatch({ type: TICKET_REMOVE_SUCCESS, payload });
            dispatch(pushToast('Заявка удалена'));
        });
    };
}