import http from './http';
import createReducer from './reducer';
import YDate from './date';
import {
    compareObject,
    compareTaskObject,
    compareUserObject,
    compareTrackObject
} from './compare';

export {
    http,
    createReducer,
    YDate,
    compareObject,
    compareTaskObject,
    compareUserObject,
    compareTrackObject
};

export function getRange(total, page, rows) {
    const start = rows * (page - 1) + 1;
    const end = Math.min(page * rows, total);

    return {
        start,
        end
    };
}

export function getFormData(form, onlyFilled) {
    const targers = form.querySelectorAll('input, textarea, select');

    return [].reduce.call(targers, (result, formElement) => {
        if (formElement.hasAttribute('name')) {
            const value = formElement.value.trim();

            if (onlyFilled) {
                if (value.length) {
                    result[formElement.name] = value;
                }
            } else {
                result[formElement.name] = value;
            }
        }

        return result;
    }, {});
}

export function debounce(func, wait, immediate) {
    let timeout;

    return (...args) => {
        const later = () => {
            timeout = null;

            if (!immediate) {
                func.apply(this, [...args]);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(this, [...args]);
        }
    };
}

export function getScrollWidth() {
    const innerWidth = window.innerWidth;
    const clientWidth = document.body.clientWidth;

    return innerWidth - clientWidth;
}

export function createTrackConfig(token) {
const config = `
/**
 * Send task to API
 * @param array $data task data
 */
function sendTask($data) {
    $curl = curl_init();
    $curlOptions = [
        CURLOPT_URL => 'http://138.68.71.239/api/v1/tasks',
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Origin: ' . $_SERVER['HTTP_ORIGIN'],
            'Content-Type: application/json',
            'Authorization: bearer ${token}'
        ],
        CURLOPT_POSTFIELDS => json_encode($data)
    ];

    curl_setopt_array($curl, $curlOptions);
    curl_exec($curl);
    curl_close($curl);
}
`;

    return config.trim();
}