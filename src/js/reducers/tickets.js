import { createReducer, updateObjectInArray, deleteObjectFromArray } from 'utils';
import { TICKETS_LOAD_REQUEST, TICKETS_LOAD_SUCCESS, TICKET_ADD_SUCCESS, TICKET_UPDATE_SUCCESS, TICKET_REMOVE_SUCCESS } from 'actions/tickets';

export default createReducer({
    [TICKETS_LOAD_REQUEST](state) {
        return {
            ...state,
            fetching: true
        };
    },

    [TICKETS_LOAD_SUCCESS](state, payload) {
        return {
            ...state,
            list: payload,
            fetching: false
        };
    },

    [TICKET_ADD_SUCCESS](state, payload) {
        return {
            ...state,
            list: [...state.list, payload]
        };
    },

    [TICKET_UPDATE_SUCCESS](state, payload) {
        return {
            ...state,
            list: updateObjectInArray(state.list, 'id', payload)
        };
    },

    [TICKET_REMOVE_SUCCESS](state, { id }) {
        return {
            ...state,
            list: deleteObjectFromArray(state.list, 'id', parseInt(id, 10))
        };
    }
}, {
    fetching: true,
    list: []
});
