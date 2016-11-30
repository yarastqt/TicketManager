import { createReducer } from 'utils';
import { SIDEBAR_TOGGLE } from 'constants/sidebar';

const initialState = localStorage.getItem('sidebar')
    ? JSON.parse(localStorage.getItem('sidebar'))
    : true;

export default createReducer((state, payload) => ({
    [SIDEBAR_TOGGLE]() {
        return !state;
    }
}), initialState);