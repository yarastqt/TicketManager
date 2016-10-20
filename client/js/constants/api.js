if (process.env.NODE_ENV === 'development') {
    module.exports.apiURL = 'http://localhost:3001/api/v1';
} else {
    module.exports.apiURL = 'http://138.68.71.239:3001/api/v1';
}