import orderBy from 'lodash/orderBy';
import { getRange } from '../utils';

export function sortData(data, { key, desc }) {
    return orderBy(data, key, desc ? 'desc' : 'asc');
}

export function paginate(data, page, rows) {
    const { start, end } = getRange(data.length, page, rows);
    return data.slice(start - 1, end);
}