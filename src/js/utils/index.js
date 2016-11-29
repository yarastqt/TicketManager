import http from './http';
import createReducer from './reducer';
import DateUtil from './date';

export {
    http,
    createReducer,
    DateUtil
};

export function findInArray(source, key, value) {
    return source.filter((item) => item[key] === value);
}

export function getObjectInArray(source, key, value) {
    return findInArray(source, key, value)[0] || {};
}

export function getRange(total, page, rows) {
    const start = rows * (page - 1) + 1;
    const end = Math.min(page * rows, total);

    return {
        start,
        end
    };
}

export function getScrollWidth() {
    const innerWidth = window.innerWidth;
    const clientWidth = document.body.clientWidth;

    return innerWidth - clientWidth;
}

// export function debounce(func, wait, immediate) {
//     let timeout;

//     return (...args) => {
//         const later = () => {
//             timeout = null;

//             if (!immediate) {
//                 func.apply(this, [...args]);
//             }
//         };

//         const callNow = immediate && !timeout;

//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);

//         if (callNow) {
//             func.apply(this, [...args]);
//         }
//     };
// }