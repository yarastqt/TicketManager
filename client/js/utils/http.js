import 'isomorphic-fetch';

const apiURL = 'http://localhost:3001/api/v1';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

function getHeaders(token) {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

function request(url, options) {
    const endpoint = apiURL + url;
    const token = localStorage.getItem('token');
    const headers = getHeaders(token);
    const advancedOptions = { ...options, headers };

    return fetch(endpoint, advancedOptions)
        .then(checkStatus)
        .then(parseJSON);
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