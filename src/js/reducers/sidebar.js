import { createReducer } from 'utils';
import types from 'constants';

const initialState = localStorage.getItem('sidebar')
    ? JSON.parse(localStorage.getItem('sidebar'))
    : true;

export default createReducer((state, payload) => ({
    [types.SIDEBAR_TOGGLE]() {
        return !state;
    }
}), initialState);