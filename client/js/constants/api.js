if (process.env.NODE_ENV === 'development') {
    module.exports.apiURL = 'http://localhost:3100/api';
} else {
    module.exports.apiURL = 'http://138.68.71.239/api';
}