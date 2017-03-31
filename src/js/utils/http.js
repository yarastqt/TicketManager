import fetch from 'isomorphic-fetch';
import { apiURL } from 'constants/api';

function parseJSON(response) {
    return response.json();
}

function getHeaders(token) {
    return {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

function request(url, options) {
    const endpoint = apiURL + url;
    const token = localStorage.getItem('token');
    const headers = getHeaders(token);
    const advancedOptions = { ...options, headers };

    return new Promise((resolve, reject) => {
        fetch(endpoint, advancedOptions)
            .then((response) => {
                if (response.ok) {
                    parseJSON(response).then((res) => resolve(res));
                } else {
                    parseJSON(response).then((res) => reject(res));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default {
    get(url) {
        return request(url);
    },

    post(url, data) {
        return request(url, {
            method: 'post',
            body: JSON.stringify(data)
        });
    },

    put(url, data) {
        return request(url, {
            method: 'put',
            body: JSON.stringify(data)
        });
    },

    delete(url) {
        return request(url, {
            method: 'delete'
        });
    }
};
