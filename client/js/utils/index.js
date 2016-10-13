import React from 'react';
import 'isomorphic-fetch';

import createReducer from './createReducer';

export {
    createReducer
};

export const http = {
    apiURL: 'http://localhost:3001/api/v1',

    get(url) {
        return this._request(url);
    },

    post(url, data) {
        return this._request(url, {
            method: 'post',
            body: JSON.stringify(data)
        });
    },

    put(url, data) {
        return this._request(url, {
            method: 'put',
            body: JSON.stringify(data)
        });
    },

    delete(url) {
        return this._request(url, {
            method: 'delete'
        });
    },

    _request(url, options) {
        const newOptions = Object.assign({}, options, {
            headers: this._getHeaders()
        });

        return fetch(`${this.apiURL}${url}`, newOptions)
            .then(this._checkStatus)
            .then(this._parseJSON);
    },

    _getHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
    },

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    },

    _parseJSON(response) {
        return response.json();
    }
};

export const getFormData = (form) => {
    return [].reduce.call(
        form.querySelectorAll('input, textarea, select'),
        (result, formElement) => {
            if (formElement.hasAttribute('name')) {
                result[formElement.name] = formElement.value.trim();
            }

            return result;
        }, {}
    );
}

export function i18n(section, key) {
    const dictionary = {
        roles: {
            'newbie': 'Новичок',
            'manager': 'Менеджер',
            'senior manager': 'Старшый менеджер',
            'admin': 'Администратор'
        },
        statuses: {
            pending: 'В процессе',
            failure: 'Отказ',
            done: 'Выполнено',
            canceled: 'Отменено'
        }
    };

    return dictionary[section][key];
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function delToken() {
    localStorage.removeItem('token');
}

// function createTypes(types, namespace) {
//     return types.reduce((acc, type) => ({
//         ...acc,
//         [`${namespace}_${type}`]: `${namespace}_${type}`
//     }), {})
// }

// export {
//     createTypes
// }